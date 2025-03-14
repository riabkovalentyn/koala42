import React,  { useEffect, useState} from "react";
import { useCharactersStore } from "../services/store/useCharactersStore";
import { Character } from "../services/types/Character";
import CharacterRow from "./CharactersRow"
import { table } from "console";

const MainTable: React.FC = () => {
    const { characters } = useCharactersStore();



    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
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
                {characters.map((characters)=>(
                    <CharacterRow key={characters.id} character={characters}/>
                ))}
            </tbody>
        </table>        
    )
};




export default MainTable;





