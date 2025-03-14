export const fetchCharacters = async () => {
    try {
        const response = await fetch('/koala42/src/services/data/example-data.json');
        if(!response.ok){
            throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }

};