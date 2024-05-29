import React, { useState, useEffect } from 'react';
import '../../components/MovieCard/Movie.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard/MovieCard'; 
import tmdbClient from '../../lib/tmdbClient';
import './MovieList.scss';

const MovieList = ({ category ,title}) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    title = category === 'tv' ? 'TV Shows' : 'Movies';
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async (page = 1) => {
        setIsLoading(true);
        try {
            let endpoint = '/movie/popular';
            if (category === 'tv') {
                endpoint = '/tv/popular'; 
            }

            const response = await tmdbClient.get(endpoint, {
                params: {
                    page: page,
                },
            });
            setMovies(response.data.results);
            setCurrentPage(response.data.page);
            setTotalPages(Math.min(response.data.total_pages, 30)); // Limit total pages to 30
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        handleSearch(newPage);
    };

    return (
        <div className="movie-list-container">
            <h1>{title}</h1>
            
            {isLoading && <p className='loading'>Loading...</p>}

            <div className="movie-results">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} /> 
                ))}
            </div>

            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="pagination-button"
                >
                    <FaAngleLeft />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => (
                    <button
                        key={index}
                        disabled={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                        className="pagination-button"
                    >
                        {index + 1}
                    </button>
                ))}
                {totalPages > 5 && (
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="pagination-button"
                    >
                        <FaAngleRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieList;
