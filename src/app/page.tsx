import { FeedingList } from "@/components/feedingList";
import { PetInfo } from "@/components/petInfo";
import { pets } from "@/mock/pets";
import Image from "next/image";
import { FeedingProvider } from "@/contexts/feedingProvider";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { FeedingActivate } from "@/components/feedingActivate";

export default function Home() {



  return (
    <main className="container mx-auto px-5 py-4 font-poppins">
      <section
        id="welcome"
        className="w-full h-48 bg-chart-1 rounded-3xl relative"
        style={{ backgroundImage: "url('/homeCard.png')" }}
      >
        <h1 className="text-xl font-bold text-secondary w-full text-center uppercase font-montserrat pt-4">
          tigela cheia pet feliz
        </h1>
        <div className="flex justify-center">
          <Image
            src={"/gato.png"}
            alt={"Gato"}
            width={123}
            height={123}
            className="absolute bottom-0"
          />
        </div>
      </section>

      <div className="my-4">
        <h2 className="font-bold">Olá Matheus,</h2>
        <p className="text-muted-foreground text-xs">
          Programe, ative e garanta a alimentação na hora certa.
        </p>
      </div>

      <section id="petInfo" className="w-full bg-chart-1 rounded-3xl px-4 py-3">
        <p className="my-2 text-muted-foreground">Seu Pet</p>
        {pets.map((pet) => (
          <PetInfo key={pet.id} pet={pet} />
        ))}
      </section>

      <section id="feedingSchedule">
        <FeedingProvider>
          <FeedingList />
        </FeedingProvider>
      </section>

      <section id="feedingActivate">
        <FeedingActivate />
      </section>
    </main>
  );
}
