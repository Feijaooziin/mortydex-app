export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  image: string;
  created: string;

  origin: {
    name: string;
  };

  location: {
    name: string;
  };

  episode: string[]; // URLs
}

export interface CharacterDetails extends Character {
  firstEpisodeName: string;
  createdYear: string;
}
