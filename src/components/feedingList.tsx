"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { FeedingItem } from "./feedingItem";
import { useFeedingContext } from "@/contexts/feedingProvider";
import { useState } from "react";

export function FeedingList() {
  const { feedingList, setFeedingList } = useFeedingContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddFeeding = () => {
    setFeedingList([
      ...feedingList,
      {
        time: "",
        weight: 0,
      },
    ]);
  };

  const handleSaveSchedule = async () => {
    setSaveError(null);
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      const timeList = {
        deviceId: "ESP32-Alimentador",
        tzOffsetMin: -180,
        items: feedingList.map((item, index) => ({
          id: index + 1,
          time: item.time || "00:00",
          weight: Number(item.weight) || 0
        }))
      };

      console.log('timeList', timeList)

      const response = await fetch("https://pet-scheduler.theo-guimaraes.workers.dev/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(timeList)
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar: ${response.status}`);
      }

      const data = await response.json();
      console.log("Agendamento salvo com sucesso:", data);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      setSaveError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsSaving(false);
    }
  };

  console.log("lista de feeding", feedingList);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programar Alimentação</h2>
        <Button
          className="rounded-full bg-secondary h-10 w-10 cursor-pointer hover:bg-secondary/60"
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
      {saveError && (
        <p className="text-red-500 text-sm mt-2">{saveError}</p>
      )}
      
      {saveSuccess && (
        <p className="text-green-500 text-sm mt-2">Agendamento salvo com sucesso!</p>
      )}
      
      <Button 
        className="w-full rounded-full bg-secondary text-black mt-2 cursor-pointer hover:bg-secondary/60"
        onClick={handleSaveSchedule}
        disabled={isSaving}
      >
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
