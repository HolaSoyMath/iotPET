/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FeedingType } from "@/mock/feeding";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type FeedingContextValue = {
  feedingList: FeedingType[];
  setFeedingList: Dispatch<SetStateAction<FeedingType[]>>;
  isLoading: boolean;
  error: string | null;
  refreshFeedingList: () => Promise<void>;
};

const FeedingContext = createContext<FeedingContextValue | undefined>(
  undefined
);

// Configurações da API
const DEVICE_ID = 'ESP32-Alimentador';
const WORKER_URL = 'https://pet-scheduler.theo-guimaraes.workers.dev';

export function FeedingProvider({ children }: { children: ReactNode }) {
  const [feedingList, setFeedingList] = useState<FeedingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os horários programados
  const fetchFeedingSchedules = async (): Promise<FeedingType[]> => {
    try {
      const response = await fetch(`${WORKER_URL}/schedule?deviceId=${DEVICE_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Converte o formato do Worker para o formato do mock
      const schedules: FeedingType[] = data.schedules?.map((schedule: any) => ({
        id: schedule.id,
        time: `${String(schedule.hh).padStart(2, '0')}:${String(schedule.mm).padStart(2, '0')}`,
        weight: schedule.weight,
        next_due_at: schedule.next_due_at, // Campo adicional do Worker
      })) || [];

      return schedules;
    } catch (err) {
      console.error('Erro ao buscar horários:', err);
      throw err;
    }
  };

  // Função para atualizar a lista
  const refreshFeedingList = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const schedules = await fetchFeedingSchedules();
      setFeedingList(schedules);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar horários de alimentação:', errorMessage);
      
      // Fallback: mantém a lista atual ou carrega mock se estiver vazio
      if (feedingList.length === 0) {
        console.log('Usando dados mock como fallback');
        // Se necessário, importe e use o mock aqui
        // setFeedingList(feeding);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os dados na inicialização
  useEffect(() => {
    refreshFeedingList();
  }, []);

  return (
    <FeedingContext.Provider 
      value={{ 
        feedingList, 
        setFeedingList, 
        isLoading, 
        error, 
        refreshFeedingList 
      }}
    >
      {children}
    </FeedingContext.Provider>
  );
}

export function useFeedingContext() {
  const ctx = useContext(FeedingContext);
  if (!ctx) {
    throw new Error(
      "useFeedingContext deve ser usado dentro de <FeedingProvider>"
    );
  }
  return ctx;
}