import Background from '@/component/background/background';
import styles from '../../styles/searchPokemons.module.scss';
import Footer from "@/component/footer/footer";
import Navbar from "@/component/header/navbar";
import PokeCard from '@/component/pokeCard/pokeCard';
import Pokedex from '@/component/pokedex/pokedex';
import pokemonService, { Pokemon } from '@/services/pokemonService';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const Pokemons = () => {
    const [pokedexOpen, setPokedexOpen] = useState(false);
    const router = useRouter()
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<Pokemon>();

    const searchPokemon = async () => {
        try {
            if(typeof searchName === 'string') {
                const res = await pokemonService.getSearchPokemons(searchName)
                setSearchResult(res)
                console.log(res)
            }
        } catch (error) {
            console.error('Error searching Pokémon:', error);
        }
    }

    useEffect(() => {
        searchPokemon()
    }, [searchName])

    const handlePokedexOpen = (pokemon: Pokemon) => {
        setPokedexOpen(true);
        setSearchResult(pokemon)
    }
    const handlePokedexClose = () => {
        setPokedexOpen(false); 
    }

    return (
        <>
            <Head>
                <title>Pokedex - {searchName}</title>
            </Head>
            <div className={styles.container}>
                <Navbar/>
                <Background/>
                <div className={styles.container_slides_pokemon}>
                    {searchResult && (
                        <div onClick={() =>handlePokedexOpen(searchResult)}>
                            <PokeCard name={searchResult.name} imageUrl={searchResult.sprites.other['official-artwork'].front_default}/>
                        </div>
                    )}
                </div>
                <div className={`${styles.pokedex} ${pokedexOpen ? styles.activePokedex : ''}`}>
                    <div className={styles.pokeInfo}>
                        <div className={styles.pokecard}>
                            {searchResult && (
                                <PokeCard name={searchResult.name} imageUrl={searchResult.sprites.other['official-artwork'].front_default}/>
                            )}
                            <div className={styles.pokeCard_info}>
                                <div className={styles.type}>
                                    {searchResult?.types?.map((type, index) => (
                                        <p>{index > 0 && ' / '}{type.type.name}</p>
                                    ))}
                                </div> 
                                <div className={styles.abilities}>
                                    <p className={styles.title}>Habilidades</p>
                                    {searchResult?.abilities?.map((abilities, index) => (
                                        <p key={index} className={styles.skill}>{abilities.ability.name}</p>
                                    ))}
                                </div> 
                            </div>
                        </div>
                    </div>
                    <Pokedex button={<Button onClick={handlePokedexClose} className={styles.close}><img src="/close.png" alt="close button" /></Button>}/>
                </div>  
            </div> 
            <Footer/>
        </>
    )
}
export default Pokemons;