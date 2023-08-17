import Background from '@/component/background/background';
import styles from '../../styles/searchPokemons.module.scss';
import Footer from "@/component/footer/footer";
import Navbar from "@/component/header/navbar";
import pokemonService, { Pokemon } from '@/services/pokemonService';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PokedexBox from '@/component/pokedexBox/pokedexBox';

const Pokemons = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<Pokemon>();

    useEffect(() => {
        searchPokemon();
    }, [searchName]);

    const searchPokemon = async () => {
        try {
            if(typeof searchName === 'string') {
                const res = await pokemonService.getSearchPokemons(searchName);
                setSearchResult(res);
                setLoading(false);
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
                        <div className={styles.containerPokedex}>
                            <PokedexBox loading={loading} selectedPokemon={searchResult}/>
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