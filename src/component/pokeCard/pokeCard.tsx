import { PokeProps } from '@/services/pokemonService';
import styles from './pokeCard.module.scss';

const PokeCard: React.FC<PokeProps> = ({name, imageUrl}) => {
    return(
        <>
            <div className={styles.container_pokeCard}>
                <div className={styles.pokeCard}>
                    <img src={imageUrl} alt={name} className={styles.imageUrl} />
                    <p className={styles.name}>{name}</p>
                </div>
            </div>
        </>
    )
}

export default PokeCard