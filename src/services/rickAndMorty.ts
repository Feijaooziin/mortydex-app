import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export async function getCharacters() {
  const res = await api.get("/character");
  return res.data.results; // 🔴 IMPORTANTÍSSIMO
}

export async function getCharacter(id: string) {
  const res = await api.get(`/character/${id}`);
  return res.data;
}
