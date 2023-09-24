import { useEffect, useState } from "react"

const usePokeInfoApi = (cardId: number) => {

  const pokeInfoURL = "https://pokeapi.co/api/v2/pokemon"

  const [pokeInfo, setPokeInfo] = useState({
    name: "",
    sprite: "",
    hp: "",
    atk: "",
    typeList: [""],
  })

  const fetchPokeInfo = () => {
    fetch(`${pokeInfoURL}/${cardId}`)
      .then((res) => res.json())
      .then((pokemonInfo) => {
        const typeList: string[] = []
        pokemonInfo.types.map((type: any) => {
          typeList.push(type.type.name)
        })

        setPokeInfo({
          name: pokemonInfo.name,
          sprite: pokemonInfo.sprites.other["official-artwork"].front_default,
          hp: pokemonInfo.stats[0].base_stat,
          atk: pokemonInfo.stats[1].base_stat,
          typeList: typeList,
        })
      })
  }

  useEffect(() => {
    let ignore = false
    !ignore && fetchPokeInfo()

    return () => {
        ignore = true
    }
  }, [])

  return pokeInfo
}

export default usePokeInfoApi
