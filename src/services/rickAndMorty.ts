// services/rickAndMorty.ts
import axios from "axios";
import { Character, CharacterDetails } from "../types/character";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

type CharactersResponse = {
  info: {
    next: string | null;
  };
  results: Character[];
};

type Params = {
  page?: number;
  name?: string;
  status?: string;
};

export async function getCharacters({
  page = 1,
  name = "",
  status = "",
}: Params) {
  const response = await api.get<CharactersResponse>("/character", {
    params: {
      page,
      name: name || undefined,
      status: status !== "All" ? status : undefined,
    },
  });

  return {
    results: response.data.results,
    next: response.data.info.next,
  };
}

export async function getCharacter(id: string) {
  const res = await api.get(`/character/${id}`);
  return res.data;
}

export async function getCharacterDetails(
  id: number,
): Promise<CharacterDetails> {
  const { data } = await api.get<Character>(`/character/${id}`);

  // 🔥 buscar primeiro episódio
  const firstEpisodeUrl = data.episode[0];
  const episodeRes = await axios.get(firstEpisodeUrl);

  return {
    ...data,
    firstEpisodeName: episodeRes.data.name,
    createdYear: new Date(data.created).getFullYear().toString(),
  };
}
