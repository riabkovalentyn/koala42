import { create } from 'zustand';
import {Character} from '../../services/types/Character';


interface CharacterStore{
    characters: Character[];
    setCharacters: (character: Character[]) => void;
    removeCharacter: (id: number) => void;
    updateCharacter: (id: number, updatedData: Partial<Character>) => void
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    showOnlyWithChildren: boolean;
    setshowOnlyWithChildren: (value: boolean) => void;
    sortAscending: boolean;
    toggleSort: () => void;
}



export const useCharactersStore = create<CharacterStore>((set) => ({
    characters: [],
    setCharacters: (characters: Character[]) => set({characters}),
    removeCharacter: (id: number) => set((state) => 
        ({characters: state.characters.filter((characters) => 
            characters.id !== id)})),
        updateCharacter: (id: number, updatedData: Partial<Character>) =>
            set((state) => ({
                characters: state.characters.map((char) =>
                char.id === id ? { ...char, ...updatedData } : char
                ),
            })),
    searchQuery: '',
    setSearchQuery: (searchQuery: string) => set({searchQuery}),
    showOnlyWithChildren: false,
    setshowOnlyWithChildren: (value: boolean) => set({showOnlyWithChildren: value}),
    sortAscending: true,
    toggleSort: () => set((state) => ({sortAscending: !state.sortAscending,
        characters: [...state.characters].sort((a, b) =>
        state.sortAscending ? a.id - b.id : b.id - a.id),
    })),        
}));