export interface Character {
    showChildren?: boolean;
    id: number;
    name: string;
    gender: string;
    ability: string;
    minimalDistance: number;
    weight: number;
    born: string;
    inSpaceSince: string;
    beerConsumption: number;
    knowsTheAnswer: boolean;
    children: (Character | NemesisCharacter)[]; 
}

export interface NemesisCharacter {
    id: number;
    characterId: number;
    isAlive: boolean;
    years: number;
    children: SecretRecord[];
}

export interface SecretRecord {
    id: number;
    nemesisID: number;
    secretCode: string;
}