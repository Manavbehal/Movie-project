import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ISO6391 from 'iso-639-1';
import StarRating from '../../components/Rating/Rating';
import tmdbClient from '../../lib/tmdbClient';
import './MovieDetails.scss';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await tmdbClient.get(`/movie/${id}`, {
          params: {
            language: 'en-US',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching the movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moviedetailscontainer">
      {movie.backdrop_path && (
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
          alt={movie.title || movie.name}
        />
      )}

      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="content">
        <h1 className="title">{movie.title || movie.name}</h1>
        <p className="tagline">{movie.tagline}</p>
        <div className="rating">
          <StarRating rating={movie.vote_average} />
        </div>
        <h2 className="heading">Genres</h2>
        <p className="genres">
          {movie.genres.map((genre, i) => (
            <span key={i}>{genre.name}</span>
          ))}
        </p>

        <h2 className="heading">OverView</h2>
        <p className="overview">{movie.overview}</p>

        <h2 className="heading">Others</h2>
        <div className="stats">
          <div className="box">
            <p className="key">Budget</p>
            <p className="value">${movie.budget || '--'}</p>
          </div>
          <div className="box">
            <p className="key">Revenue</p>
            <p className="value">${movie.revenue || '--'}</p>
          </div>
          <div className="box">
            <p className="key">Status</p>
            <p className="value">{movie.status}</p>
          </div>
          <div className="box">
            <p className="key">Original Language</p>
            <p className="value">{ISO6391.getName(movie.original_language)}</p>
          </div>
          <div className="box">
            <p className="key">Runtime</p>
            <p className="value">
              {movie.runtime}
              {' '}
              mins
            </p>
          </div>
          <div className="box">
            <p className="key">Rating</p>
            <p className="value">
              {movie.vote_average}
              /10
            </p>
          </div>
          <div className="box">
            <p className="key">Release Date</p>
            <p className="value">{moment(movie.release_date).format('DD MMMM YYYY')}</p>
          </div>
          <div className="box">
            <p className="key">Country</p>
            <p className="value">
              {movie.production_countries
                .splice(0, 1)
                .map((country, i) => (
                  <span key={i}>{country.name}</span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
