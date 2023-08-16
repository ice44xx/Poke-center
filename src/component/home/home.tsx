import styles from '../../../styles/home.module.scss'
import Background from '../background/background'
import Footer from '../footer/footer'
import Navbar from '../header/navbar'
import SlidesPokemon from '../slidesPokemon/slidesPokemon'
const Home = () => {
    return (
        <div className={styles.container}>
            <Navbar/>
            <Background/>
            <SlidesPokemon/>
            <Footer/>
        </div>
    )
}
export default Home