import { PokeProps } from '@/services/pokemonService';
import styles from './pokeCard.module.scss';

const PokeCard: React.FC<PokeProps> = ({ name, imageUrl, loading }) => {
  return (
    <>
      <div className={styles.container_pokeCard}>
        <div className={styles.pokeCard}>
          {loading ? (
            <img src='/load.gif' alt='' className={styles.loading} />
          ) : (
            <>
              <img src={imageUrl} alt={name} className={styles.imageUrl} />
              <p className={styles.name}>{name.length > 16 ? `${name.slice(0, 16)}...` : name}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PokeCard;
