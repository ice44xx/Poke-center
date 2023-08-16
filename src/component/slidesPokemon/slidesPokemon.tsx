import styles from './slidesPokemon.module.scss'
import pokemonService from "@/services/pokemonService";
import PokeCard from "../pokeCard/pokeCard";
import React, {useState, useEffect} from 'react'

interface Pokemon {
    name: string;
    url: string;
}

const SlidesPokemon = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const featchPokemon = async () => {
            try {
                const pokemonList = await pokemonService.getAllPokemons();
                setPokemons(pokemonList)
                console.log(pokemonList)
            } catch (error) {
                console.log('algo errado.')
            }
        } 
        featchPokemon()
    }, [])

    return (
        <>  
            <div className={styles.container_slides_pokemon}>
                {pokemons.map((pokemon) => (
                    <div key={pokemon.name}>
                        <PokeCard  name={pokemon.name} imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SlidesPokemon;