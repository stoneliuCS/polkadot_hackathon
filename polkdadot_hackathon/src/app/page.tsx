import React from "react";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl">Untitled Battle</h1>
        <Button>Start Game</Button>
      </div>
    </div>
  );
}
