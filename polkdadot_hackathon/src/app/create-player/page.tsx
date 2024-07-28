"use client"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
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
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

async function generateMnemonic() {
  try {
    const res = await fetch("http://localhost:4000/api/create-mnemonic", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
    const data = await res.json()
    return data.data
  } catch (e) {
    console.log(e)
  }
}

export default function CreatePlayer() {
  const router = useRouter()
  const [inputs, setInputs] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values: any) => ({ ...values, [name]: value }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    await onSignUp(inputs)
    setLoading(false)
    router.push("/game")
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-4">Create Your Player</h1>
        <form onSubmit={handleSubmit} className="w-80">
          <div className="flex flex-col">
            <label className="mb-2 ">
              Name:
              <input
                className="border-2 border-black w-full"
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name || ""}
              />
            </label>
            <label className="mb-2 w-full">
              Password:
              <input
                className="border-2 border-black w-full"
                type="text"
                name="password"
                onChange={handleChange}
                value={inputs.password || ""}
              />
            </label>
            <label className="mb-2 w-full">
              Mnemonic:
              <input
                className="border-2 border-black w-full"
                type="text"
                name="mnemonic"
                onChange={handleChange}
                value={inputs.mnemonic || ""}
              />
            </label>
          </div>
          <div className="flex flex-row gap-x-1">
            <Button color="primary" type="submit" className="mt-4 flex-1">
              Create Player
            </Button>
            <Button
              color="secondary"
              type="button"
              onClick={async () => {
                const mnemonic = await generateMnemonic()
                setInputs((values: any) => ({ ...values, mnemonic }))
              }}
              className="mt-4 flex-1"
            >
              Generate a Mnemonic
            </Button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
