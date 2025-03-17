import jsonData from "../services/data/example-data.json";
import { Character, NemesisCharacter } from "../services/types/Character";

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
      children: item.has_nemesis
        ? item.has_nemesis.records.map(
            (nemesis: any): NemesisCharacter => ({
              id: parseInt(nemesis.data.ID, 10),
              name: `Nemesis ${nemesis.data["Character ID"]}`,
              knowsTheAnswer: nemesis.data["Is alive?"] === "true",
              years: parseInt(nemesis.data.Years, 10) || 0,
            })
          )
        : [],
    });

    console.log("Started data JSON:", jsonData);
    
    const transformedData: Character[] = Array.isArray(jsonData)
      ? jsonData.map(transformCharacter)
      : [];

    console.log("Transformed data:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("Error transformation JSON:", error);
    return [];
  }
};
