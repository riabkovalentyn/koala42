import jsonData from "../services/data/example-data.json";
import { Character } from "../services/types/Character";

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const transformCharacter = (item: any): Character => ({
      id: parseInt(item.data.ID, 10),
      name: item.data.Name,
      gender: item.data.Gender?.toLowerCase() || "unknown",
      ability: item.data.Ability || "unknown",
      minimalDistance: parseFloat(item.data["Minimal distance"]) || 0,
      waigth: parseFloat(item.data.Weight) || 0,
      born: item.data.Born || "",
      inSpaceSince: item.data["In space since"] || "",
      beerConsumption: parseInt(item.data["Beer consumption (l/y)"], 10) || 0,
      knowsTheAnswer: item.data["Knows the answer?"] === "true",
      children: item.children
        ? Object.values(item.children)
            .flatMap((group: any) =>
              Array.isArray(group.records)
                ? group.records.map(transformCharacter)
                : []
            )
        : [],
    });

    console.log("Исходные данные JSON:", jsonData);
    
    const transformedData: Character[] = Array.isArray(jsonData)
      ? jsonData.map(transformCharacter)
      : [];

    console.log("Трансформированные данные:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("Ошибка трансформации JSON:", error);
    return [];
  }
};
