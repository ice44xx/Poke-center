import styles from './pokedex.module.scss';
import { ReactNode } from 'react';

const Pokedex = ({button}: {button?: ReactNode}) => {
    return (
        <>
            <div className={styles.container_pokedex}>
                <img src="/pokedex.webp" alt="pokedex" className={styles.pokedex} />
                {button}
            </div>
        </>
    )
}

export default Pokedex;