"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { FeedingItem } from "./feedingItem";
import { useFeedingContext } from "@/contexts/feedingProvider";

export function FeedingList() {
  const { feedingList, setFeedingList } = useFeedingContext();

  const handleAddFeeding = () => {
    setFeedingList([
      ...feedingList,
      {
        time: "",
        weight: 0,
      },
    ]);
  };

  console.log("lista de feeding", feedingList);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programar Alimentação</h2>
        <Button
          className="rounded-full bg-secondary h-10 w-10"
          onClick={handleAddFeeding}
        >
          <Plus className="text-black" />
        </Button>
      </div>
      <div className="mt-4">
        {feedingList.map((feeding, index) => (
          <FeedingItem
            key={index}
            index={index}
            time={feeding.time}
            weight={feeding.weight > 0 ? feeding.weight.toString() : ""}
          />
        ))}
      </div>
      <Button className="w-full rounded-full bg-secondary text-black mt-2">
        Salvar
      </Button>
    </div>
  );
}
