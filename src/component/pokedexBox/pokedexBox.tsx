import React from 'react';
import styles from './pokedexBox.module.scss';
import { Button } from 'reactstrap';
import Pokedex from '../pokedex/pokedex';
import PokeCard from '../pokeCard/pokeCard';
import { Ability, Pokemon, Stats, Types } from '@/services/pokemonService';
interface Props {
  selectedPokemon: Pokemon;
  handlePokedexClose?: () => void;
  loading?: boolean;
}

const PokedexBox: React.FC<Props> = ({ selectedPokemon, handlePokedexClose, loading }) => {
  const renderTypes = (types?: Types[]) => {
    return types?.map((type, index) => (
      <p key={index}>
        {index > 0 && ' / '}
        {type.type.name}
      </p>
    ));
  };
  const renderAbilities = (abilities?: Ability[]) => {
    return abilities?.map((ability, index) => (
      <p key={index} className={styles.skill}>
        {index + 1} - {ability.ability.name}
      </p>
    ));
  };
  const renderStats = (stats?: Stats[]) => {
    return stats?.map((stat, index) => (
      <p key={index}>
        {stat.stat.name} <span>{stat.base_stat}</span>
      </p>
    ));
  };

  return (
    <div className={styles.pokedex}>
      <div className={styles.pokeCard}>
        {selectedPokemon && (
          <PokeCard
            loading={loading}
            name={selectedPokemon.name}
            imageUrl={selectedPokemon.sprites.other['official-artwork'].front_default}
          />
        )}
      </div>
      <div className={styles.pokeInfo}>
        <div className={styles.type}>{renderTypes(selectedPokemon?.types)}</div>
        <div className={styles.abilities}>
          <p className={styles.title}>Habilidades</p>
          {renderAbilities(selectedPokemon?.abilities)}
          <div className={styles.infomcd}>
            {selectedPokemon?.height && <p>Altura: {selectedPokemon?.height / 10}m </p>}
            {selectedPokemon?.weight && <p>Peso: {selectedPokemon?.weight / 10} kg</p>}
          </div>
        </div>
      </div>
      <div className={styles.pokedexId}>
        {selectedPokemon && (
          <p>
            <span>{selectedPokemon.id}</span>
          </p>
        )}
      </div>
      <div className={styles.pokeStats}>{renderStats(selectedPokemon?.stats)}</div>
      <Pokedex
        button={
          <Button onClick={handlePokedexClose} className={styles.close}>
            <img src='/close.png' alt='' />
          </Button>
        }
      />
    </div>
  );
};
export default PokedexBox;
