const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters() {
  const response = await fetch(`${BASE_URL}/character`);
  const data = await response.json();
  return data.results;
}

export async function getCharacter(id: string) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  return response.json();
}
