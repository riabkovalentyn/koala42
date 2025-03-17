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
  
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ability</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Minimal Distance</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Born</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">In Space Since</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Beer Consumption</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Knows Answer?</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {characters.length > 0 ? (
              filteredCharacters.map((character, index) => (
                <CharacterRow key={character.id} character={character} isOdd={index % 2 === 1} />
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                  Data doesn't exist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };


  
  export default MainTable;




