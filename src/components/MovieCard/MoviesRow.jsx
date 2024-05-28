import React, { useEffect, useState } from 'react';
import tmdbClient from '../../lib/tmdbClient';
import MovieCard from './MovieCard'; 
import './Movie.scss';

const categoryArray = [
    {
        title: 'Popular',
        apiUrl: `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    },
    {
        title: 'Top Rated',
        apiUrl: `/movie/top_rated?language=en-US&page=1`,
    },

    {
        title: 'Best by Tom Cruise',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&page=1&with_cast=500&with_people=500&sort_by=vote_count.desc`,
    },
    {
        title: 'Action',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&with_genres=28`,
    },
    {
        title: 'Best by Shah Rukh Khan',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&page=1&with_cast=35742&with_people=35742&sort_by=vote_count.desc`,
    },
    {
        title: 'Comedy',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&with_genres=35`,
    },
    {
        title: 'Best from Bollywood',
        apiUrl: `/discover/movie?sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_original_language=hi`,
    },
    {
        title: 'Horror',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&with_genres=27`,
    },
    {
        title: 'Best from 2010',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&primary_release_year=2010&sort_by=vote_count.desc`,
    },
    {
        title: 'Best by Leonardo DiCaprio',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&page=1&with_cast=6194&with_people=6194&sort_by=vote_count.desc`,
    },
    {
        title: 'Sci-Fi',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&with_genres=878&sort_by=vote_count.desc`,
    },
    {
        title: 'Crime',
        apiUrl: `/discover/movie?language=en-US&include_adult=false&include_video=false&page=1&with_genres=80`,
    },
    
];

const MovieRows = () => {
    const [moviesByCategory, setMoviesByCategory] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const dataPromises = categoryArray.map(async (category) => {
                try {
                    const response = await tmdbClient.get(category.apiUrl);
                    return {
                        title: category.title,
                        movies: response.data.results,
                    };
                } catch (error) {
                    console.error(`Error fetching ${category.title} movies:`, error);
                    return null;
                }
            });

            const moviesData = await Promise.all(dataPromises);
            const updatedMoviesByCategory = {};
            moviesData.forEach((categoryData) => {
                if (categoryData) {
                    updatedMoviesByCategory[categoryData.title] = categoryData.movies;
                }
            });
            setMoviesByCategory(updatedMoviesByCategory);
        };

        fetchData();
    }, []);

    return (
        <div>
            {Object.keys(moviesByCategory).map((categoryTitle) => (
                <div key={categoryTitle}>
                    <h2 className='Movie-title'>{categoryTitle}</h2>
                    <div className="movie-row">
                        {moviesByCategory[categoryTitle].map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieRows;
