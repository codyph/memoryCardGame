"use client"

import Button from "@/components/Button"
import Card from "@/components/Card"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useState } from "react"

const GamePage = () => {
  const router = useRouter()
  const numberOfIds = 1000
  const pokemonIDs = Array.from({ length: numberOfIds }, (_, i) => i + 1)

  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selected, setSelected] = useState(Array(numberOfIds).fill(0))
  const [idsInPlay, setIdsInPlay] = useState([1, 2])

  function handleCardSelect(selectedCardId: number) {
    if (selected[selectedCardId - 1] !== pokemonIDs[selectedCardId - 1]) {
      const newList = [...selected]
      newList[selectedCardId - 1] = selectedCardId

      setSelected([...newList])
      updateScore()
      nextRound()
    } else {
      gameOver()
    }
  }

  function updateScore() {
    setCurrentScore((c) => c + 1)
    if (currentScore > bestScore) {
      setBestScore(currentScore)
    }
  }

  function nextRound() {
    const getSelectedIds = selected.filter((s) => s !== 0)
    console.log(getSelectedIds)
    const randomSelectedId =
      getSelectedIds[Math.floor(Math.random() * getSelectedIds.length)]
    const randomPokemonId = Math.floor(Math.random() * numberOfIds)

    const idList = [randomSelectedId, randomPokemonId]


    setIdsInPlay([...idList])

  }

  function handleHomeClick() {
    router.push("/")
  }

  function gameOver() {
    alert("Game Over")
    setSelected([...Array(numberOfIds).fill(0)])
    setCurrentScore(0)
  }

  const getRandomID = (list: number[]) => {
    const randomId = list[Math.floor(Math.random() * list.length)]
    // setListOfPickedIds(randomId)
  }

  return (
    <div>
      <Header score={currentScore} bestScore={bestScore} />
      <div className="flex flex-col items-center">
        <div className="flex w-screen flex-col justify-center md:h-[50%] md:flex-row">
          <Card cardId={idsInPlay[0]} onClick={() => handleCardSelect(idsInPlay[0])} />
          <Card cardId={idsInPlay[1]} onClick={() => handleCardSelect(idsInPlay[1])} />
        </div>
        <Button disabled={false} className="w-48" onClick={handleHomeClick}>
          {" "}
          Home{" "}
        </Button>
      </div>
      {idsInPlay.map(id => <p>{id}</p>)}
      <p className="flex overflow-hidden">{selected}</p>
    </div>
  )
}

export default GamePage
