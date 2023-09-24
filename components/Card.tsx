"use client"

import getPokemon from "@/actions/getPokemon"
import { pokeColors } from "@/hooks/useColorAPI"
import Image from "next/image"

interface CardProps {
  cardId: number
}

const Card: React.FC<CardProps> = ({ cardId }) => {
  const { pokeInfo, speciesInfo, colorInfo } = getPokemon({ cardId })

  return (
    <div className="flex p-[5%]">
      <div
        className="m-auto flex h-96 w-64 flex-col rounded-3xl p-2"
        style={{
          backgroundColor: `rgb(${colorInfo[3]})`,
          border: `6px solid rgb(${colorInfo[1]})`,
        }}
      >
        <div title="mainBox" className="mx-1 flex flex-col">
          <div title="cardHeader" className="flex flex-col justify-between gap-y-1">
            <h1
              className="text-xl font-semibold capitalize tracking-wide drop-shadow-md text-center"
              style={{
                color: `rgb(${colorInfo[0]})`,
              }}
            >
              {pokeInfo.name}
            </h1>
            <div className="flex justify-between">
            <p
              className="rounded-full px-3 py-0.5 text-center w-fit"
              style={{
                backgroundColor: `rgb(${colorInfo[1]})`,
                color: `rgb(${colorInfo[0]})`
              }}
            >
              HP: {pokeInfo.hp}
            </p>
            <p
              className="rounded-full px-3 py-0.5 text-center w-fit"
              style={{
                backgroundColor: `rgb(${colorInfo[1]})`,
                color: `rgb(${colorInfo[0]})`
              }}
            >
              ATK: {pokeInfo.atk}
            </p>
            </div>
          </div>
          <div
            title="image"
            className="relative flex h-[144px] w-full items-center justify-center py-2"
          >
            <Image
              className="rounded-3xl object-contain drop-shadow-[0_10px_5px_rgba(0,0,0,0.15)]"
              src={pokeInfo.sprite}
              alt="Pokemon Image"
              fill={true}
            />
          </div>
          <div title="listOfTypes" className="flex items-center justify-evenly">
            {pokeInfo.typeList.map((type) => {
              return (
                <p
                  key={type}
                  className="rounded-full px-3 py-0.5 text-center"
                  style={{
                    backgroundColor: `rgb(${pokeColors(type)})`,
                  }}
                >
                  {type}
                </p>
              )
            })}
          </div>
        </div>
        <div title="descBox" className="flex h-full items-center overflow-auto">
          <p
            style={{
              color: `rgb(${colorInfo[0]})`,
            }}
            className="text-center text-[13px] font-medium"
          >
            {speciesInfo.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
