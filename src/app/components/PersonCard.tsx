/* eslint-disable @next/next/no-img-element */
import React from "react";
import { extractImgPoster } from "@/app/utils/extractImg";

type Person = {
  id: number;
  name: string;
  profile_path?: string;
  // Add other properties as needed
};

interface PersonCardProps {
  singlePerson: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ singlePerson }) => {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden transition-all rounded-md hover:scale-105 md:hover:scale-110">
        {singlePerson.profile_path ? (
          <img
            src={extractImgPoster(singlePerson.profile_path)}
            className="rounded-md shadow-lg"
            alt={singlePerson.name}
          />
        ) : (
          <div className="w-full h-[320px] bg-slate-100"></div>
        )}
      </div>
      <div className="space-y-2">
        <h3>{singlePerson.name}</h3>
      </div>
    </div>
  );
};

export default PersonCard;
