"use client";

import { Power } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function FeedingActivate() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    console.log("isActive", isActive);
  }, [isActive]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Ativar Comedouro</h2>
      <div
        className={`w-full ${isActive ? "bg-lime-200" : "bg-secondary"} py-2 px-2 rounded-lg h-16 duration-300 hover:bg-secondary/60`}
      >
        <Button className={`${isActive ? "bg-lime-200" : "bg-white"} w-full h-full shadow-none cursor-pointer hover:bg-stone-100/90`} onClick={() => handleClick()}>
          <div className="flex gap-3 w-32">
            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
              <Power
                className={`bg-none ${isActive ? "text-lime-700" : "text-stone-300"}`}
              />
            </div>
            <div>
              <p className="text-primary text-start font-light">Ligar</p>
              <p className={`${isActive ? "text-lime-700" : "text-muted-foreground"} text-start font-light`}>
                {isActive ? "ATIVO" : "DESLIGADO"}
              </p>
            </div>
          </div>
        </Button>
      </div>
    </>
  );
}
