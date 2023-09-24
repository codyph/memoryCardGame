import useColorAPI from "@/hooks/useColorAPI"
import usePokeInfoApi from "@/hooks/usePokeInfoApi"
import usePokeSpeciesApi from "@/hooks/usePokeSpeciesApi"

const getPokemon = ({ cardId }: { cardId: number }) => {
  const pokeInfo = usePokeInfoApi(cardId)
  const speciesInfo = usePokeSpeciesApi(cardId)
  // const colorInfo = useColorAPI( speciesInfo.color )
  const colorInfo = useColorAPI(pokeInfo.typeList[0])

  return { pokeInfo, speciesInfo, colorInfo }
}
export default getPokemon
