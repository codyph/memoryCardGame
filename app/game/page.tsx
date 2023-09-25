"use client"

import Button from "@/components/Button"
import Card from "@/components/Card"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


function getRandomIds(list1: number[]) {
  const randomId = Math.floor(Math.random()*list1.length) + list1[0]
  return randomId
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

let initRound = true

const GamePage = () => {
  const router = useRouter()
  const numberOfIds = 1000
  const randomIdsForNow = Array.from({ length: 10 }, (_, i) => i + 1)
  const pokemonIDs = Array.from({ length: numberOfIds }, (_, i) => i + 1)

  const [pokeIds, setPokeIds] = useState(Array.from({ length: numberOfIds }, (_, i) => i + 1))
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selected, setSelected] = useState(Array(numberOfIds).fill(0))
  const [idsInPlay, setIdsInPlay] = useState([1, 2])


  useEffect(() => {
      let ignore = false
      const fetchRound = () => {
        !ignore && nextRound()
      }
      fetchRound()

      return () => {
        ignore = true
      }
  }, [currentScore])

  function handleCardSelect(selectedCardId: number) {
    if (selected[selectedCardId - 1] === 0) {
      // Haven't previously selected
      const newSelectedList = selected.map((id, index) => {
        if (index === selectedCardId - 1) {
          return selectedCardId
        } else {
          return id
        }
      })

      const removeSelectedId = pokeIds.map((id, index) => {
        if (index === selectedCardId - 1) {
          return 0
        } else {
          return id
        }
      })

      setSelected(newSelectedList)
      setPokeIds(removeSelectedId)
      updateScore()
    } else {
      // Selected previously
      gameOver()

    }
  }

  function updateScore() {
    setCurrentScore((c) => c + 1)
    if (currentScore + 1 > bestScore) {
      setBestScore(bs => bs + 1)
    }
  }

  function nextRound() {
    const pokeIdsLeft = pokeIds.filter(pI => pI !== 0)
    const shuffledPokeIds = shuffleArray(pokeIdsLeft)

    const selectedIds = () => { 
      const sIds = selected.filter(s => s !== 0)
      if (!sIds[0]) {
        return [shuffledPokeIds[1]]
      }
      return sIds
    }
    const randomlySelectedId = shuffleArray(selectedIds())[0]

    setIdsInPlay(shuffleArray([randomlySelectedId, shuffledPokeIds[0]]))
    
  }

  function handleHomeClick() {
    router.push("/")
  }

  function gameOver() {
    alert("Game Over")
    setSelected([...Array(numberOfIds).fill(0)])
    setCurrentScore(0)
  }

  return (
    <div>
      <Header score={currentScore} bestScore={bestScore} />
      <div className="flex flex-col items-center">
        <div className="flex w-screen flex-col justify-center md:h-[50%] md:flex-row">
          {idsInPlay.map((id) => {
            return <Card key={id} cardId={id} onClick={() => handleCardSelect(id)}/>
          })}
        </div>
        <Button disabled={false} className="w-48" onClick={handleHomeClick}>
          {" "}
          Home{" "}
        </Button>
      </div>
    </div>
  )
}

export default GamePage
