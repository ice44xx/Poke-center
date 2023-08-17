import styles from './slidesPokemon.module.scss';
import pokemonService, { Pokemon } from "@/services/pokemonService";
import PokeCard from "../pokeCard/pokeCard";
import React, {useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import Background from '../background/background';
import PokedexBox from '../pokedexBox/pokedexBox';

const SlidesPokemon = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [pokedexOpen, setPokedexOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 21;

    useEffect(() => {
        const featchPokemon = async (page: number) => {
            try {
                const offset = (page - 1) * pokemonsPerPage;
                const pokemonList = await pokemonService.getAllPokemons(offset, pokemonsPerPage);
                const pokemonDataPromises = pokemonList.map(async (pokemon: Pokemon) => {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();
                    return data;
                });
                const pokemonData = await Promise.all(pokemonDataPromises);
                setPokemons(pokemonData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        } 
        featchPokemon(currentPage);
    }, [currentPage]);

    const handlePokedexOpen = (pokemon: Pokemon) => {
        setPokedexOpen(true);
        setSelectedPokemon(pokemon);
    }
    const handlePokedexClose = () => {
        setSelectedPokemon(null);
        setPokedexOpen(false); 
    }

    return (
        <>  
            <div className={styles.container_pokemons}>
                <Background/>
                <div className={styles.container_slides_pokemon}>
                    {pokemons.map((pokemon, index) => (
                        <div key={index} onClick={() => handlePokedexOpen(pokemon)}>
                            <PokeCard loading={loading} name={pokemon.name} imageUrl={pokemon.sprites.other['official-artwork'].front_default}/>
                        </div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <Button className={styles.btn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >Anterior</Button>
                    <span className={styles.span}>{currentPage}</span>
                    <Button className={styles.btn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 61}>Próxima</Button>
                </div>
                <div className={`${styles.containerPokedex} ${pokedexOpen ? styles.activePokedex : ''}`}>
                    <div className={styles.pokedex}>
                        <PokedexBox loading={loading} selectedPokemon={selectedPokemon!} handlePokedexClose={handlePokedexClose}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlidesPokemon;