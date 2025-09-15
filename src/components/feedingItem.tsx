"use client";

import { Bone, Clock, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { useFeedingContext } from "@/contexts/feedingProvider";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

type FeedingItemProps = {
  index: number;
  time?: string;
  weight?: string;
};

export function FeedingItem({ index, time, weight }: FeedingItemProps) {
  const { feedingList, setFeedingList } = useFeedingContext();
  const timeInputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  function handleTimeChange(value: string) {
    setFeedingList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, time: value } : item))
    );
  }

  function handleWeightChange(value: string) {
    setFeedingList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, weight: Number(value) } : item
      )
    );
  }

  function deleteItem() {
    setFeedingList((prev) => prev.filter((_, i) => i !== index));
  }

  function handleClockClick() {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker();
    }
  }

  return (
    <div className="flex w-full gap-2 mb-3">
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="flex-1">
          <p className="mb-2">{index + 1}ª Refeição</p>
          <div className="relative rounded-full border px-2 flex items-center">
            <Clock
              className={`${time ? "text-primary" : "text-muted-foreground"} cursor-pointer mr-1`}
              onClick={handleClockClick}
            />

            <Input
              ref={timeInputRef}
              type={time || focused ? "time" : "text"}
              value={time || ""}
              onChange={(e) => handleTimeChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onClick={handleClockClick}
              placeholder="--:--"
              className="border-0 bg-transparent pl-0 [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-2">Quantidade</p>
          <div className="rounded-full border-1 border-muted-foreground px-2 flex items-center">
            <Bone
              className={`${weight ? "text-primary" : "text-muted-foreground"}`}
            />
            <Input
              className="border-none"
              value={weight}
              placeholder="200g"
              onChange={(e) => handleWeightChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      {feedingList.length > 2 && (
        <div className="flex items-end self-end">
          <Button
            className="bg-transparent border-0 shadow-none p-2 hover:bg-gray-200/60 cursor-pointer"
            onClick={() => deleteItem()}
          >
            <Trash className="text-destructive" />
          </Button>
        </div>
      )}
    </div>
  );
}
