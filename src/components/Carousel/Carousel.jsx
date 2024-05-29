import React, { useEffect, useState ,useRef } from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.scss';
import tmdbClient from '../../lib/tmdbClient';
import { FaPlay } from 'react-icons/fa';
import Image from '../../components/Image/Image';
import StarRating from '../Rating/Rating.jsx';
import ISO6391 from 'iso-639-1';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [isMobile, setIsMobile] = useState(true);
    const carouselRef = useRef(null);
    const [isAutoPlayActive, setIsAutoPlayActive] = useState(false);
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await tmdbClient.get('/movie/now_playing', {
            params: {
              language: 'en-US',
              page: 1,
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching the movies:', error);
        }
      };
  
      fetchMovies();
    }, []);

    const setDeviceType = () => (window.innerWidth < 900
      ? setIsMobile(true)
      : setIsMobile(false));
  
    useEffect(() => {
      setDeviceType();
      window.addEventListener('resize', () => setDeviceType());
    }, []);

    useEffect(() => {
      const handleInteraction = () => {
        setIsAutoPlayActive(true);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      };

      window.addEventListener('click', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);

      return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      };
    }, []);

    return (
      <div className="movie-slider">
        <ReactCarousel
          autoPlay={isAutoPlayActive}
          infiniteLoop
          emulateTouch
          autoFocus
          useKeyboardArrows
          centerMode={!isMobile}
          centerSlidePercentage={80}
          swipeable
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          showThumbs={false}
          interval={2000}
          ref={carouselRef}
        >
          {movies.map((movie) => (
             <Link to={`/movie/${movie.id}`} key={movie.id} className="slider-item1">
            <div key={movie.id} className="slider-item">
              <div className="playIcon">
                <FaPlay />
              </div>
              <div className="backdrop">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  placeholderSrc={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="info">
                <div className="title">
                  <h1>{movie.title}</h1>
                </div> 
                <p className="others">
                  {moment(movie.release_date).format('MMMM YYYY')} | {ISO6391.getName(movie.original_language)}
                </p>
                <div className="rating">
                  <StarRating
                    rating={movie.vote_average}
                    starDimension={16}
                  />
                  <span className="overview">({movie.vote_average.toFixed(1)})</span>
                </div>
                <div className="overview">
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </ReactCarousel>
        
      </div>
      
    );
};

export default Carousel;
