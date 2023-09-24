"use client"

import useColorAPI from "@/hooks/useColorAPI"
import Image from "next/image"
import { useEffect, useState } from "react"

interface CardProps {
  cardId: number
}

interface PokemonInfoType {
  name: string
  sprite: string
  hp: string
  typeList: string[]
}

interface PokemonSpeciesType {
  color: string
  description: string
  isLegendary: boolean
}

const Card: React.FC<CardProps> = ({ cardId }) => {
  // STATES TO MANAGE
  const [pokeInfo, setPokeInfo] = useState<PokemonInfoType>()
  const [speciesInfo, setSpeciesInfo] = useState<PokemonSpeciesType>()
  const [colorInfo, setColorInfo] = useState("")
  const [isInfoLoading, setIsInfoLoading] = useState(true)
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true)

  const pokeInfoURL = "https://pokeapi.co/api/v2/pokemon"
  const speciesInfoURL = "https://pokeapi.co/api/v2/pokemon-species"

  // SYNC WITH API: GET NORMAL POKEMON INFO
  useEffect(() => {
    let ignore = false
    fetch(`${pokeInfoURL}/${cardId}`)
      .then((res) => res.json())
      .then((pokemonInfo) => {
        if (!ignore) {
          const typeList: string[] = []
          pokemonInfo.types.map((type) => {
            typeList.push(type.type.name)
          })

          setPokeInfo({
            name: pokemonInfo.name,
            sprite: pokemonInfo.sprites.other["official-artwork"].front_default,
            hp: pokemonInfo.stats[0].base_stat,
            typeList: typeList,
          })
          setIsInfoLoading(false)
        }
      })

    // Cleanup if aborting
    return () => {
      ignore = true
    }
  }, [])

  // SYNC WITH API: GET DETAILED POKEMON INFO
  useEffect(() => {
    let ignore = false
    fetch(`${speciesInfoURL}/${cardId}`)
      .then((res) => res.json())
      .then((speciesInfo) => {
        if (!ignore) {
          let speciesDescription = ""
          const textEntries = speciesInfo.flavor_text_entries.reverse()

          for (const entry of textEntries) {
            if (entry.language.name === "en") {
              speciesDescription = entry.flavor_text
              break
            }
          }

          setSpeciesInfo({
            color: speciesInfo.color.name,
            description: speciesDescription,
            isLegendary: speciesInfo.is_legendary,
          })
          setIsSpeciesLoading(false)
        }
      })

    // Cleanup if aborting
    return () => {
      ignore = true
    }
  }, [])

  console.log(useColorAPI(speciesInfo?.color))
  console.log(speciesInfo?.color)


  if (isInfoLoading || isSpeciesLoading) return <p>Loading...</p>
  if (!pokeInfo || !speciesInfo) return <p>No Data</p>

  return (
    <div className="bg-cyan-400">
      <p className="capitalize">{pokeInfo.name}</p>
      <p>{pokeInfo.hp}</p>
      <Image
        src={pokeInfo.sprite}
        height={200}
        width={400}
        alt="Pokemon Image"
      />
      <div>
        {pokeInfo.typeList.map((type) => {
          return <p>{type}</p>
        })}
      </div>
      <p>{speciesInfo.description}</p>
    </div>
  )
}

export default Card

// function useColorAPI(color: string) {
//     let colorPalette = ""
//     // const [colorPalette, setColorPalette] = useState("")

//     const initialRGB = pokeColors("blue")

//     useEffect(() => {
//         let ignore = false

//         const colorData = {
//             model: "ui",
//             input: ["N", "N", initialRGB, "N", "N"],
//         }

//         fetch("http://colormind.io/api/", {
//             method: 'POST',
//             body: JSON.stringify(colorData)
//         }).then(
//             res => res.json()
//         ).then(
//             palette => {colorPalette = palette.result}
//         )

//         return () => {ignore = true}
//     }, [])

//     return colorPalette
// }

function pokeColors(color: string) {
  switch (color) {
    case "black":
      return ""
    case "blue":
      return ""
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
