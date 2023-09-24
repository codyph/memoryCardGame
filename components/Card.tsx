"use client"

import getPokemon from "@/actions/getPokemon"
import { pokeColors } from "@/hooks/useColorAPI"
import Image from "next/image"

interface CardProps {
  cardId: number,
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ cardId, onClick }) => {
  const { pokeInfo, speciesInfo, colorInfo } = getPokemon({ cardId })

  return (
    <div className="flex p-[4%] md:p-[2%]">
      <div
        onClick={onClick}
        className="m-auto flex h-80 w-52 flex-col rounded-3xl p-2 md:h-[420px] md:w-[280px] hover:scale-[110%] transition drop-shadow-md"
        style={{
          backgroundColor: `rgb(${colorInfo[3]})`,
          border: `6px solid rgb(${colorInfo[1]})`,
        }}
      >
        <div title="mainBox" className="mx-1 flex flex-col gap-y-1">
          <div
            title="cardHeader"
            className="flex flex-col justify-between gap-y-1"
          >
            <h1
              className="text-center text-xl font-semibold capitalize tracking-wide drop-shadow-md"
              style={{
                color: `rgb(${colorInfo[0]})`,
              }}
            >
              {pokeInfo.name}
            </h1>
            <div className="flex justify-between">
              <p
                className="w-fit rounded-full px-3 py-0.5 text-center"
                style={{
                  backgroundColor: `rgb(${colorInfo[1]})`,
                  color: `rgb(${colorInfo[0]})`,
                }}
              >
                HP: {pokeInfo.hp}
              </p>
              <p
                className="w-fit rounded-full px-3 py-0.5 text-center"
                style={{
                  backgroundColor: `rgb(${colorInfo[1]})`,
                  color: `rgb(${colorInfo[0]})`,
                }}
              >
                ATK: {pokeInfo.atk}
              </p>
            </div>
          </div>
          <div
            title="image"
            className="relative flex h-[144px] w-full items-center justify-center"
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
        <div
          title="descBox"
          className="hidden h-full items-center overflow-auto md:flex"
        >
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
