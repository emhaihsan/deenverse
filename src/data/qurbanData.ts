import { QurbanAnimal } from "@/types/animals";

const qurbanAnimals: QurbanAnimal[] = [
    {
      id: "goat",
      name: "Kambing/Domba",
      price: 2500000,
      maxShares: 1,
      minAge: "1 tahun (2 gigi tetap)",
      description: "Kambing atau domba yang sehat dan memenuhi syarat",
      icon: "🐐",
      color: "bg-green-50 border-green-200 text-green-700",
      benefits: [
        "1 ekor untuk 1 orang",
        "Daging berkualitas tinggi",
        "Mudah didistribusi",
      ],
    },
    {
      id: "cow",
      name: "Sapi/Kerbau",
      price: 15000000,
      maxShares: 7,
      minAge: "2 tahun (4 gigi tetap)",
      description: "Sapi atau kerbau yang sehat dan memenuhi syarat",
      icon: "🐄",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      benefits: [
        "1 ekor untuk maksimal 7 orang",
        "Daging melimpah",
        "Ekonomis untuk grup",
      ],
    },
    {
      id: "camel",
      name: "Unta",
      price: 40000000,
      maxShares: 7,
      minAge: "5 tahun",
      description: "Unta yang sehat dan memenuhi syarat",
      icon: "🐪",
      color: "bg-amber-50 border-amber-200 text-amber-700",
      benefits: [
        "1 ekor untuk maksimal 7 orang",
        "Pahala berlimpah",
        "Tradisi Nabi",
      ],
    },
  ];

export default qurbanAnimals;
