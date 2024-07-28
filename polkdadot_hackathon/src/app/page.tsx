import React from "react"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl mb-4">Untitled Battle</h1>
        <Link href={"/create-player"}>
          <Button>Start Game</Button>
        </Link>
      </div>
    </div>
  )
}
