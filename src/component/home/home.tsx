import styles from '../../../styles/home.module.scss';
import Footer from '../footer/footer';
import Navbar from '../header/navbar';
import SlidesPokemon from '../slidesPokemon/slidesPokemon';

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <SlidesPokemon />
      <Footer />
    </div>
  );
};
export default Home;
