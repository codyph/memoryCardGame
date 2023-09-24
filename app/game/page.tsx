"use client";

import getPokemon from "@/actions/getPokemon";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useState } from "react";

const GamePage = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [listOfPickedIds, setListOfPickedIds] = useState(1);
  const [listOfUnpickedIds, setListOfUnpickedIds] = useState(
    Array.from({ length: 1010 }, (_, i) => i + 1),
  );

  const [testMe, setTestMe] = useState("");
  const [testMe2, setTestMe2] = useState("");

  function handleBackClick() {
    setListOfPickedIds((c) => c - 1);
  }
  function handleForwardClick() {
    setListOfPickedIds((c) => c + 1);
  }

  function getRandomId() {}

  return (
    <div>
      <div>
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleForwardClick}>Next</button>
      </div>
      <p>{listOfPickedIds}</p>
      <Header />
      <Card key={listOfPickedIds} cardId={listOfPickedIds} />
      <Button disabled={false}> Home </Button>
    </div>
  );
};

export default GamePage;
