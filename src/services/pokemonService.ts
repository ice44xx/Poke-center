import createApi from "./api"

export type Pokemon = {
     id?: number;
     name: string;
     url: string;
     sprites: {
          other: {
               'official-artwork': {
                    front_default: string;
                };
          }
     },
     abilities?: Ability[]
    height?: number;
    types?: Types[];
}
export type Ability = {
     ability: {
          name: string;
          url: string;
     };
}
export type Types = {
     type: {
          name: string;
     }
}

const pokemonService = {
     getAllPokemons: async (offset: number, limit: number) => {
       try {
          const api = createApi(`pokemon?offset=${offset}&limit=${limit}`);
          const res = await api.get('/')
          const data = res.data
          return data.results
       } catch (error) {
          console.error('Error fetching all Pokémon:', error);
          throw error;
       }
     },
     getSearchPokemons: async (name: string) => {
          try {
               const api = createApi(`pokemon`)
               const res = await api.get(`/${name}`)
               const data = res.data
               return data
          } catch (error) {
               console.error('Error fetching all Pokémon:', error);
               throw error;
          }
     }
}

export default pokemonService;