import styles from './slidesPokemon.module.scss'
import pokemonService, { Pokemon } from "@/services/pokemonService";
import PokeCard from "../pokeCard/pokeCard";
import React, {useState, useEffect} from 'react'
import { Button } from 'reactstrap';
import Pokedex from '../pokedex/pokedex';
import Background from '../background/background';

const SlidesPokemon = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [pokedexOpen, setPokedexOpen] = useState(false);
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
                console.log(pokemonData)
            } catch (error) {
                console.log('algo errado.')
            }
        } 
        featchPokemon(currentPage)
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
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.name} onClick={() => handlePokedexOpen(pokemon)}>
                            <PokeCard name={pokemon.name} imageUrl={pokemon.sprites.other['official-artwork'].front_default}/>
                        </div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <Button className={styles.btn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >Anterior</Button>
                    <span className={styles.span}>{currentPage}</span>
                    <Button className={styles.btn} onClick={() => setCurrentPage(currentPage + 1)}>Próxima</Button>
                </div>
                <div className={`${styles.containerPokedex} ${pokedexOpen ? styles.activePokedex : ''}`}>
                    <div className={styles.pokedex}>
                        <div className={styles.pokeCard}>
                            {selectedPokemon && (
                                <PokeCard name={selectedPokemon.name} imageUrl={selectedPokemon.sprites.other['official-artwork'].front_default}/>
                            )}
                        </div>
                        <div className={styles.pokeInfo}>
                            <div className={styles.type}>
                                {selectedPokemon?.types?.map((type, index) => (
                                    <p>{index > 0 && ' / '}{type.type.name}</p>
                                ))}
                                </div> 
                                <div className={styles.abilities}>
                                    <p className={styles.title}>Habilidades</p>
                                    {selectedPokemon?.abilities?.map((abilities, index) => (
                                    <p key={index} className={styles.skill}>{index + 1} - {abilities.ability.name}</p>
                                ))}
                            </div>                         
                        </div>
                        <Pokedex button={<Button onClick={handlePokedexClose} className={styles.close}><img src="/close.png" alt="" /></Button>}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlidesPokemon;