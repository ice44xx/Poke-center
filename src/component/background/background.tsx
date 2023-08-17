import styles from './back.module.scss';

const Background = () => {
    return (
        <>
            <div className={styles.background}>
                <img src="/background.png" alt="background"/>
                <div className={styles.smoke}></div>
            </div>
        </>
    )
}
export default Background;