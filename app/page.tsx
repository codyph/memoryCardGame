"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handePlayGameClick() {
    router.push("game");
  }

  return (
    <div className="flex h-screen w-screen p-[5%]">
      <div
        className={`m-auto flex h-[70%] w-full flex-col items-center justify-between rounded-[25px]
             border bg-gray-500 p-8 drop-shadow-md lg:h-[750px] lg:w-[600px]`}
      >
        <div className="space-y-[-10px] text-center tracking-[14px]">
          <h1 className="text-[2.5em] font-semibold lg:text-[4em]">MEMORY</h1>
          <h1 className="text-[1em] font-light opacity-20 lg:text-[1.5em]">
            SHMEMORY
          </h1>
        </div>
        <br />
        <div className="flex flex-col items-center justify-center  rounded-[25px] border bg-slate-500 p-6 text-center drop-shadow-md lg:h-[33%] lg:text-lg">
          <p className="font-light">
            Pick a pokemon card you haven't seen before, and you'll move onto the next
            round.{" "}
          </p>
          <br />
          <p>Pick a card you have seen before...</p>
          <br />
          <p>
            <b>You Lose.</b>
          </p>
        </div>
        <br />
        <p>How good is your memory?</p>
        <br />
        <Button
          className=""
          disabled={false}
          onClick={handePlayGameClick}
        >
          Play Game
        </Button>
      </div>
    </div>
  );
}
