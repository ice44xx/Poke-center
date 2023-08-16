import createApi from "./api"

const pokemonService = {
    getAllPokemons: async () => {
       try {
            const api = createApi('pokemon/?limit=20');
            const res = await api.get('/')
            const data = res.data
            return data.results
       } catch (error) {
            console.error('Error fetching all Pokémon:', error);
            throw error;
       }
    }
}

export default pokemonService;