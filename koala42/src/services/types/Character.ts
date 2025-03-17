export interface Character {
    showChilderen?: boolean;
    id: number;
    name: string;
    gender: string;
    ability: string;
    minimalDistance: number;
    waigth: number;
    born: string;
    inSpaceSince: string;
    beerConsumption: number;
    knowsTheAnswer: boolean;
    children: Character[]; 
}