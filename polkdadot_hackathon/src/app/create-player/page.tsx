"use client"
import { Button } from "@nextui-org/react"
import { NextResponse } from "next/server"
import { useState } from "react"

async function onSignUp(inputs: object) {
  try {
    const res = await fetch("http://localhost:4000/api/create-account", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(inputs),
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
}

export default function CreatePlayer() {
  const [inputs, setInputs] = useState<any>({})
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values: any) => ({ ...values, [name]: value }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSignUp(inputs)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl mb-4">Create Your Player</h1>
        <form onSubmit={handleSubmit} className="w-80">
          <div className="flex flex-col">
            <label className="mb-2 w-full">
              Name:
              <input
                className="border-2 border-black w-full mx-2"
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name || ""}
              />
            </label>
            <label className="mb-2 w-full">
              Password:
              <input
                className="border-2 border-black w-full mx-2"
                type="text"
                name="password"
                onChange={handleChange}
                value={inputs.password || ""}
              />
            </label>
            <label className="mb-2 w-full">
              Mnemonic:
              <input
                className="border-2 border-black w-full mx-2"
                type="text"
                name="mnemonic"
                onChange={handleChange}
                value={inputs.mnemonic || ""}
              />
            </label>
          </div>
          <Button type="submit" className="mt-4">Start Game</Button>
        </form>
      </div>
    </div>
  )
}
