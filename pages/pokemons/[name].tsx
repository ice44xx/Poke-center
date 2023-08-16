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

const Pokemons = () => {
    const router = useRouter()
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<Pokemon>();

    useEffect(() => {
        searchPokemon()
    }, [searchName]);

    const searchPokemon = async () => {
        try {
            if(typeof searchName === 'string') {
                const res = await pokemonService.getSearchPokemons(searchName)
                setSearchResult(res)
                console.log(res)
            }
        } catch (error) {
            console.error('Error searching Pokémon:', error);
            setSearchResult(undefined);
        }
    }

    return (
        <>
            <Head><title>Pokedex - {searchName}</title></Head>
            <div className={styles.container}>
                <Navbar/>
                <Background/>
                {searchResult ? (
                    <>
                        <div className={styles.pokedex_title}>
                            <p>POKEDEX - Pokémon <span>{searchResult?.name}</span> Nº {searchResult?.id}</p>
                        </div>
                        <div className={styles.pokedex}>
                            <Pokedex/>
                            <div className={styles.pokeCard}>
                                {searchResult && (
                                    <PokeCard name={searchResult.name} imageUrl={searchResult.sprites.other['official-artwork'].front_default}/>
                                )}
                            </div>
                            <div className={styles.pokeInfo}>
                                <div className={styles.type}>
                                    {searchResult?.types?.map((type, index) => (
                                        <p key={index}>{index > 0 && ' / '}{type.type.name}</p>
                                    ))}
                                    </div> 
                                    <div className={styles.abilities}>
                                        <p className={styles.title}>Habilidades</p>
                                        {searchResult?.abilities?.map((abilities, index) => (
                                        <p key={index} className={styles.skill}>{index + 1} - {abilities.ability.name}</p>
                                    ))}
                                </div> 
                            </div>
                        </div> 
                    </>
                ) : (
                    <div className={styles.notFound}>
                        <p className={styles.title}>Pokemon <span>{searchName}</span> não encontrado</p>
                        <img src="/notFound.png" alt="Pokemon não encontrado" className={styles.img} />
                    </div> 
                )}
            </div> 
            <Footer/>
        </>
    )
}
export default Pokemons;