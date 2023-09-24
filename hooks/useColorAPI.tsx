import { useEffect, useState } from "react"

export default function useColorAPI(color: string) {
  const [colorPalette, setColorPalette] = useState()

  const initialRGB = pokeColors(color)

  useEffect(() => {
    let ignore = false

    const colorData = {
      model: "ui",
      input: ["N", "N", initialRGB, "N", "N"],
    }

    const fetchData = async () => {
      fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify(colorData),
      })
        .then((res) => res.json())
        .then((palette) => {
          if (!ignore) {
            setColorPalette(palette.result)
          }
        })
    }

    fetchData()

    return () => {ignore = true}

  }, [color])

  return colorPalette
}

function pokeColors(color: string) {
  switch (color) {
    case "black":
      return ""
    case "blue":
      return [66, 122, 161]
    case "brown":
      return ""
    case "gray":
      return ""
    case "pink":
      return ""
    case "purple":
      return ""
    case "red":
      return [223, 41, 53]
    case "white":
      return ""
    case "yellow":
      return ""
    default:
      return ""
  }
}
