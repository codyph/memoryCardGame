"use client"

import Button from "@/components/Button"
import Card from "@/components/Card"
import Header from "@/components/Header"
import { useState } from "react"

const GamePage = () => {
  const [currentScore, setCurrentScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [listOfPickedIds, setListOfPickedIds] = useState(1)
  const [listOfUnpickedIds, setListOfUnpickedIds] = useState(
    Array.from({ length: 1000 }, (_, i) => i + 1),
  )

  function handleBackClick() {
    setListOfPickedIds((c) => c - 1)
  }
  function handleRandomClick() {
    setListOfPickedIds(Math.floor(Math.random()*1000))
  }
  function handleForwardClick() {
    setListOfPickedIds((c) => c + 1)
  }

  function getRandomId() {}

  return (
    <div>
      <div className="flex justify-between">
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleRandomClick}>Random</button>
        <button onClick={handleForwardClick}>Next</button>
      </div>
      <Header />
      <div className="flex w-screen justify-center">
        <Card key={listOfPickedIds} cardId={listOfPickedIds} />
      </div>
      <Button disabled={false}> Home </Button>
    </div>
  )
}

export default GamePage
