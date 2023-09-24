import getPokemon from "@/actions/getPokemon";
import React from "react";
import { twMerge } from "tailwind-merge";

const page = async () => {
  const cheese = await getPokemon(55);

  const colorStrings: string[] = cheese.map((color: Number[]) => {
    return String(color);
  });
  console.log(colorStrings);

  return (
    <div className="">
      <>
        {colorStrings.map((color: string, i: number) => {
            return (
            <div style={{
                backgroundColor: `rgb(${color})`
            }}>
                <h1 className="text-[50px]">{color}</h1>
            </div>
            )
        })}
      </>
    </div>
  );
};

export default page;
