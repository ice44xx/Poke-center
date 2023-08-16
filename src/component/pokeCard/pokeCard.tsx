import styles from './pokeCard.module.scss';

type PokeProps = {
    name: string;
    imageUrl: string
}

const PokeCard: React.FC<PokeProps> = ({name, imageUrl}) => {
    return(
        <>
            <div className={styles.container_pokeCard}>
                <div className={styles.pokeCard}>
                    <img src={imageUrl} alt={name} />
                    <p className={styles.name}>{name}</p>
                </div>
            </div>

        </>
    )
}

export default PokeCard