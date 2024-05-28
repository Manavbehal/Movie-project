import './Home.scss'
import Carousel from '../../components/Carousel/Carousel.jsx';
import MovieRows from '../../components/MovieCard/MoviesRow.jsx';
const Home = () => {
    return (
    <div className="home-contianer">
        <Carousel/>
        <MovieRows/>
    </div>);
  };
  
  export default Home;