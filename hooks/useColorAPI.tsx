import { useEffect, useState } from "react"

const useColorAPI = (color: string) => {
  console.log("useColorAPI Hook")
  const [colorPalette, setColorPalette] = useState([""])

  const colorData = {
    model: "ui",
    input: ["N", "N", pokeColors(color), "N", "N"],
  }

  const fetchColorInfo = () => {
    fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify(colorData),
    })
      .then((res) => res.json())
      .then((palette) => {
        console.log(palette.result)
        setColorPalette([...palette.result])
      })
  }

  useEffect(() => {
    let ignore = false
    if (!color) {
      console.log("DISMOUNT: UNDEFINED COLOUR")
      return
    }

    !ignore && fetchColorInfo()

    return () => {
      ignore = true
      console.log("DISMOUNT: COLOUR HOOK")
    }
  }, [color])

  return colorPalette
}

export default useColorAPI

export function pokeColors(color: string) {
  switch (color) {
    case "black":
    case "shadow":
      return [27, 27, 27]
    case "blue":
    case "water":
      return [0, 112, 187]
    case "brown":
    case "ground":
      return [129, 97, 62]
    case "gray":
    case "normal":
      return [122, 123, 128]
    case "green":
    case "grass":
      return [3, 128, 40]
    case "pink":
    case "fairy":
      return [230, 131, 157]
    case "purple":
    case "poison":
      return [141, 43, 217]
    case "red":
    case "fire":
      return [206, 32, 41]
    case "white":
      return [194, 194, 194]
    case "yellow":
    case "electric":
      return [166, 126, 25]
    case "rock":
      return [188, 189, 132]
    case "fighting":
      return [199, 122, 46]
    case "psychic":
      return [224, 65, 145]
    case "ghost":
      return [97, 52, 133]
    case "flying":
      return [102, 184, 217]
    case "dragon":
      return [49, 82, 181]
    case "ice":
      return [42, 192, 209]
    case "bug":
      return [131, 156, 40]
    case "steel":
      return [92, 151, 181]
    case "dark":
      return [41, 33, 26]
    case "unknown":
      return [73, 156, 134]
    default:
      return ""
  }
}
