import create from 'zustand';
import {Character} from '../../services/types/Character';


interface CharacterStore{
    characters: Character[];
    setCharacters: (character: Character[]) => void;
    removerCharacter: (id: number) => void;
}



export const useCharactersStore = create<CharacterStore>((set) => ({

    characters: [],
    setCharacters: (characters: Character[]) => set({characters}),
    removeCharacter: (id: number) => set((state) => 
        ({characters: state.characters.filter((characters) => 
            characters.id !== id)}))


}));