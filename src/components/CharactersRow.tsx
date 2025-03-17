import React, { useState } from "react";
import { useCharactersStore } from "../services/store/useCharactersStore";
import { Character, NemesisCharacter, SecretRecord } from "../services/types/Character";

interface CharacterRowProps {
    character: Character | NemesisCharacter | SecretRecord;
    level?: number;
  }
  
  const CharacterRow: React.FC<CharacterRowProps> = ({ character, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("name" in character ? character.name : '');
    const updateCharacter = useCharactersStore((state) => state.updateCharacter);
    const removeCharacter = useCharactersStore((state) => state.removeCharacter);
    const isMainCharacter = 'gender' in character;
    const isNemesisCharacter = 'isAlive' in character;
    const isSecretRecord = 'secretCode' in character;
  
    const renderHeaders = (level: number) => {
      if (level === 1) {
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Character ID</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Is Alive?</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Years</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        );
      } else if (level === 2) {
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nemesis ID</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Secret Code</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        );
      }
      return null;
    };
  
    return (
      <>
        <tr className="hover:bg-gray-100">
          <td className="px-6 py-4 text-center">
            {"children" in character && character.children.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                {isExpanded ? "↓" : "→"}
              </button>
            )}
          </td>
  
          {isMainCharacter ? (
            <>
              <td className="px-6 py-4 text-center">{character.id}</td>
              <td className="px-6 py-4 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  (character as Character).name
                )}
              </td>
              <td className="px-6 py-4 text-center capitalize">{(character as Character).gender}</td>
              <td className="px-6 py-4 text-center">{(character as Character).ability}</td>
              <td className="px-6 py-4 text-center">{(character as Character).minimalDistance}</td>
              <td className="px-6 py-4 text-center">{(character as Character).weight}</td>
              <td className="px-6 py-4 text-center">{(character as Character).born}</td>
              <td className="px-6 py-4 text-center">{(character as Character).inSpaceSince}</td>
              <td className="px-6 py-4 text-center">{(character as Character).beerConsumption}</td>
              <td className="px-6 py-4 text-center">{(character as Character).knowsTheAnswer ? "Y" : "N"}</td>
            </>
          ) : isNemesisCharacter ? (
            <>
              <td className="px-6 py-4 text-center">{(character as NemesisCharacter).characterId}</td>
              <td className="px-6 py-4 text-center">{(character as NemesisCharacter).isAlive ? "Alive" : "Dead"}</td>
              <td className="px-6 py-4 text-center">{(character as NemesisCharacter).years}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => removeCharacter(character.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-800"
                  >
                    X
                  </button>
                </div>
              </td>
            </>
          ) : isSecretRecord ? (
            <>
              <td className="px-6 py-4 text-center">{(character as SecretRecord).nemesisID}</td>
              <td className="px-6 py-4 text-center">{(character as SecretRecord).secretCode}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => removeCharacter(character.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-800"
                  >
                    X
                  </button>
                </div>
              </td>
            </>
          ) : null}
  
          {isMainCharacter && (
            <td className="px-6 py-4 text-center">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => {
                    if (isEditing) updateCharacter(character.id, { name: editedName });
                    setIsEditing(!isEditing);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  {isEditing ? "Save" : "Change"}
                </button>
                <button
                  onClick={() => removeCharacter(character.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-800"
                >
                  X
                </button>
              </div>
            </td>
          )}
        </tr>
        {isExpanded && 'children' in character && character.children.map((child, index) => (
          <React.Fragment key={child.id}>
            {index === 0 && renderHeaders(level + 1)}
            <CharacterRow character={child} level={level + 1} />
          </React.Fragment>
        ))}
      </>
    );
  };
  
  export default CharacterRow;