import { useEffect, useState } from "react"

const usePokeSpeciesApi = (cardId: number) => {
  const speciesInfoURL = "https://pokeapi.co/api/v2/pokemon-species"

  const [speciesInfo, setSpeciesInfo] = useState({
    color: "",
    description: "",
    isLegendary: "",
  })

  const fetchSpeciesInfo = () => {
    fetch(`${speciesInfoURL}/${cardId}`)
      .then((res) => res.json())
      .then((speciesInfo) => {
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
      })
  }

  useEffect(() => {
    let ignore = false
    !ignore && fetchSpeciesInfo()

    return () => {
      ignore = true
    }
  }, [])

  return speciesInfo
}

export default usePokeSpeciesApi
