import React,  { useEffect, useState} from "react";
import { useCharactersStore } from "../services/store/useCharactersStore";
import { Character } from "../services/types/Character";
import CharacterRow from "./CharactersRow"
import { table } from "console";

const MainTable: React.FC = () => {
    const { characters, searchQuery, setSearchQuery, toggleSort } = useCharactersStore();

    const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
        <div>
            <div className="flex justify-between mb-4">
            <input
                type="text"
                placeholder="Looking..."
                className="p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={toggleSort}
            >
                Sort by ID
            </button>
            </div>
        

        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2"></th>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Gender</th>
                    <th className="p-2">Ability</th>
                    <th className="p-2">Minimal Distance</th>
                    <th className="p-2">Weight</th>
                    <th className="p-2">Born</th>
                    <th className="p-2">In Space Since</th>
                    <th className="p-2">Beer Consumition</th>
                    <th className="p-2">Knows Answer?</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {characters.length > 0 ? (

                    filteredCharacters.map((characters)=>(
                        <CharacterRow key={characters.id} character={characters}/>
                    )
                )) : (
                    <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-600">Data dosent exist</td>
                    </tr>
                )
                }
            </tbody>
        </table>
    </div>            
    )
};




export default MainTable;





