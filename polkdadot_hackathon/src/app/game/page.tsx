"use client"
import React, { useState, useEffect } from "react"
import TransitionText from "@/components/Game"
import HorrorGame from "@/components/horror/HorrorGame"

export default function Game() {
  const [showHorrorGame, setShowHorrorGame] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHorrorGame(true)
    }, 8000)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [])

  return (
    <div>
      <div className="flex justify-center">{!showHorrorGame && <TransitionText time={2000} />}</div>
      {showHorrorGame && <HorrorGame />}
    </div>
  )
}
