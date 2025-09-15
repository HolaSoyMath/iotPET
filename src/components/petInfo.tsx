import { PetInfoType } from "@/mock/pets";
import Image from "next/image";

export function PetInfo({ pet }: { pet: PetInfoType }) {

  const calculateTimeDifference = () => {
    const now = new Date();
    const lastFeedingTime = pet.lastFeeding;
    const diffMs = now.getTime() - lastFeedingTime.getTime();
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minutos`;
    }
    
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    
    if (diffHours === 1) {
      return remainingMinutes > 0 ? `1 hora e ${remainingMinutes} minutos` : `1 hora`;
    } else {
      return remainingMinutes > 0 ? `${diffHours} horas e ${remainingMinutes} minutos` : `${diffHours} horas`;
    }
  };
  
  const timeSinceLastFeeding = calculateTimeDifference();

  return (
    <>
      <div className="flex flex-row justify-between bg-white rounded-lg py-2 px-3 items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={pet.image}
            alt={pet.name}
            width={36}
            height={36}
            className="rounded-full"
            style={{ width: "36px", height: "36px", objectFit: "cover" }}
          />
          <div>
            <p>{pet.name}</p>
            <p className="text-muted-foreground text-xs">{pet.type}</p>
          </div>
        </div>
        <Image
          src={"/pata-rosa.png"}
          alt={"Ícone de pata"}
          width={16}
          height={16}
          style={{ width: "16px", height: "16px" }}
        />
      </div>
      <div className="flex flex-row gap-3 my-3">
        <div>
          <p className="text-muted-foreground text-xs font-light w-14">Gênero</p>
          <p className="text-sm">{pet.gender}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-light w-14">Idade</p>
          <p className="text-sm">{pet.age} anos</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs font-light">
            Última Alimentação
          </p>
          <p className="text-sm">{timeSinceLastFeeding}</p>
        </div>
      </div>
    </>
  );
}
