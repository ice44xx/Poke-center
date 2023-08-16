import { useState } from 'react';
import styles from '../../../styles/header.module.scss';
import Search from './search';
import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }
    return (
        <>
            <div className={styles.navbar}>
                <img src="/logo.png" alt="" className={styles.logo} onClick={() => router.push('/')}/>
                <img onClick={handleShow} src="/lupa.png" alt="search" className={styles.icon} />
            </div>
            <div className={`${styles.container_search} ${show ? styles.active : ''}`}>
                <Search/>
            </div>
        </>
    )
}

export default Navbar