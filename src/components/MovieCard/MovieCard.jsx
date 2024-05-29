import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ISO6391 from 'iso-639-1';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { BsStarFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const MovieCard = ({ movie }) => {
    const { title, name, vote_average, poster_path, release_date, original_language, adult, id } = movie;
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const isMovieBookmarked = localStorage.getItem(id);
        setIsBookmarked(!!isMovieBookmarked);
    }, [id]);

    const handleBookmarkClick = () => {
        try {
            setIsBookmarked(!isBookmarked);
            if (isBookmarked) {
                localStorage.removeItem(id);
            } else {
                localStorage.setItem(id, JSON.stringify(movie));
            }
        } catch (error) {
            console.log('Unable to Bookmark this item because localStorage is not accessible');
        }
    };

    return (
        <div className="movie-card">
            <div className="rating">
                <div className="rating-container">
                  <p className="rating-1">
                   <BsStarFill />
                   </p>
                   <p className='rating-text'>{vote_average.toFixed(1)}</p>
                
                  
                 </div>

                 <div className="bookmark-container">
                  <p
                    className="bookmark"
                    onClick={handleBookmarkClick}
                  >
                    {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
                </p>
                </div>
            </div>
            <LazyLoadImage
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={title || name}
                effect="blur"
            />
            <div className="info">
                <h2 className="title">{title || name}</h2>
                <p className="others">
                    {moment(release_date).format('MMMM YYYY')}
                    {' '}
                    •
                    {ISO6391.getName(original_language)}
                    {' '}
                    {adult ? ' • 18+' : ''}
                </p>
               
            </div>
        </div>
    );
};

export default MovieCard;
