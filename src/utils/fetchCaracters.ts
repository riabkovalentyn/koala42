import jsonData from "../services/data/example-data.json";
import { Character, NemesisCharacter, SecretRecord } from "../services/types/Character";

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const transformCharacter = (item: any): Character => ({
      id: parseInt(item.data.ID, 10),
      name: item.data.Name,
      gender: item.data.Gender?.toLowerCase() || "unknown",
      ability: item.data.Ability || "unknown",
      minimalDistance: parseFloat(item.data["Minimal distance"]) || 0,
      weight: parseFloat(item.data.Weight) || 0,
      born: item.data.Born || "",
      inSpaceSince: item.data["In space since"] || "",
      beerConsumption: parseInt(item.data["Beer consumption (l/y)"], 10) || 0,
      knowsTheAnswer: item.data["Knows the answer?"] === "true",
      children: item.children?.has_nemesis?.records.map(
        (nemesis: any): NemesisCharacter => ({
          id: parseInt(nemesis.data.ID, 10),
          characterId: parseInt(nemesis.data["Character ID"], 10),
          isAlive: nemesis.data["Is alive?"] === "true",
          years: parseInt(nemesis.data.Years, 10) || 0,
          children: nemesis.children?.has_secrete?.records.map(
            (secret: any): SecretRecord => ({
              id: parseInt(secret.data.ID, 10),
              nemesisID: parseInt(secret.data["Nemesis ID"], 10),
              secretCode: secret.data["Secrete Code"] || "",
            })
          ) || [],
        })
      ) || [],
    });

    console.log("Started data JSON:", jsonData);

    const removeDuplicates = (characters: Character[]): Character[] => {
      const uniqueCharacters = new Map<number, Character>();
      characters.forEach((char) => {
        if (char.children) {
          char.children = removeDuplicates(char.children as Character[]);
        }
        uniqueCharacters.set(char.id, char);
      });
      return Array.from(uniqueCharacters.values());
    };

    const transformedData: Character[] = Array.isArray(jsonData)
      ? jsonData.map(transformCharacter)
      : [];
    console.log("Transformed data:", transformedData);

    const uniqueData = removeDuplicates(transformedData);
    console.log("Unique data:", uniqueData);
    return uniqueData;
  } catch (error) {
    console.error("Error transforming JSON:", error);
    return [];
  }
};
