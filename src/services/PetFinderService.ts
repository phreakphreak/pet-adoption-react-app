import { Animal, Breed, QueryParams, TypeAnimal } from "@pet/animal";
import { fetchData } from "./fetchData";

type Data = {
  types: TypeAnimal[];
  type: TypeAnimal;
  breeds: Breed[];
  animals: Animal[];
  animal: Animal;
};

export async function fetchTypes() {
  const [data, error] = await fetchData<Data>("/types");
  if (error) return await Promise.reject(error);
  if (data) {
    const { types } = data;
    return types;
  }
}

export async function fetchSingleType(type: string) {
  const [data, error] = await fetchData<Data>(`/types/${type}`);
  if (error) return await Promise.reject(error);
  if (data) {
    const { type } = data;
    return type;
  }
}

export async function fetchBreeds(type: string) {
  const [data, error] = await fetchData<Data>(`/types/${type}/breeds`);
  if (error) return await Promise.reject(error);
  if (data) {
    const { breeds } = data;
    return breeds;
  }
}

export async function fetchAnimals(options: QueryParams = {}) {
  const [data, error] = await fetchData<Data>("/animals", options);
  if (error) return await Promise.reject(error);
  if (data) {
    const { animals } = data;
    return animals;
  }
}

export async function fetchAnimalById(id: number | string) {
  const [data, error] = await fetchData<Data>(`/animals/${id}`);
  if (error) return await Promise.reject(error);
  if (data) {
    const { animals } = data;
    return animals;
  }
}
