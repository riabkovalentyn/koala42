import React, {useState} from "react";
import { useCharactersStore } from "../services/store/useCharactersStore";
import { Character } from "../services/types/Character";


interface CharacterRowProps {
    character: Character
    level? : number 
}

const CharacterRow: React.FC<CharacterRowProps> = ({character, level = 0}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const removeCharacter = useCharactersStore((state) => state.removeCharacter);

    return (
        <>
            <tr className="border-b hover:bg-gray-100">
                <td className="p-2 text-center" style= {{ paddingLeft: `${level*20}px`}}>
                    {character.id}
                </td>
                <td className="p-2 font-size medium">{character.name}</td>
                <td className="p-2 capitalize">{character.gender}</td>
                <td className="p-2">{character.ability}</td>
                <td className="p-2 text-center">{character.minimalDistance}</td>
                <td className="p-2 text-right">{character.waigth}</td>
                <td className="p-2 text-right">{character.born}</td>
                <td className="p-2">{character.inSpaceSince}</td>
                <td className="p-2">{character.beerConsumption}</td>
                <td className="p-2 text-right">{character.knowsTheAnswer ? 'Y' : 'N'}</td>
                <td className="p-2 flex space-x-2">
                    {character.children && character.children.length > 0 && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-800">
                                {isExpanded ? '↓' : '→'}

                        </button>
                    )
                    }
                    <button
                        onClick={() => removeCharacter(character.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-800">
                            X
                    </button>
                </td>
            </tr>
            {isExpanded && character.children && character.children.map((child) => (

                <CharacterRow key={child.id} character={child} level={level +1}/>
                ))}
        </>
    )}


export default CharacterRow;