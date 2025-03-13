import { create } from 'zustand';
import {Character} from '../../services/types/Character';


interface CharacterStore{
    characters: Character[];
    setCharacters: (character: Character[]) => void;
    removeCharacter: (id: number) => void;
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    showOnlyWithChildren: boolean;
    sortAscending: boolean;
    toggleSort: () => void;
}



export const useCharactersStore = create<CharacterStore>((set) => ({
    characters: [],
    setCharacters: (characters: Character[]) => set({characters}),
    removeCharacter: (id: number) => set((state) => 
        ({characters: state.characters.filter((characters) => 
            characters.id !== id)})),
    searchQuery: '',
    setSearchQuery: (searchQuery: string) => set({searchQuery}),
    showOnlyWithChildren: false,
    setOnlyWithChildren: (value: boolean) => set({showOnlyWithChildren: value}),
    sortAscending: true,
    toggleSort: () => set((state) => ({sortAscending: !state.sortAscending})),        
}));