"use client";

import { feeding, FeedingType } from "@/mock/feeding";
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
};

const FeedingContext = createContext<FeedingContextValue | undefined>(
  undefined
);

export function FeedingProvider({ children }: { children: ReactNode }) {
  const [feedingList, setFeedingList] = useState<FeedingType[]>([]);

  useEffect(() => {
    setFeedingList(feeding);
  }, []);

  return (
    <FeedingContext.Provider value={{ feedingList, setFeedingList }}>
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
