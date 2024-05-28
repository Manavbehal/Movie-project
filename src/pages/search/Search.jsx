import React, { useState, useEffect } from 'react';
import '../../components/MovieCard/Movie.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard/MovieCard'; 
import tmdbClient from '../../lib/tmdbClient';
import './Search.scss';

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSearch = async (page = 1) => {
        if (!query) return;
        setIsLoading(true);
        try {
            const response = await tmdbClient.get('/search/movie', {
                params: {
                    query: query,
                    page: page,
                },
            });
            setMovies(response.data.results);
            setCurrentPage(response.data.page);
            setTotalPages(response.data.total_pages);
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

    const renderPagination = () => {
        const pagesToShow = 5;
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    disabled={i === currentPage}
                    onClick={() => handlePageChange(i)}
                    className="pagination-button"
                >
                    {i}
                </button>
            );
        }

        if (currentPage > pagesToShow) {
            pages.unshift(
                <button key="prev" onClick={() => handlePageChange(currentPage - pagesToShow)}>
                    <FaAngleLeft   style={{ color: '#21daa2' }} />
                </button>
            );
        }

        if (currentPage + pagesToShow <= totalPages) {
            pages.push(
                <button key="next" onClick={() => handlePageChange(currentPage + pagesToShow)}>
                    <FaAngleRight style={{ color: '#21daa2' }}  />
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
                className="search-input"
            />

            {isLoading && <p>Loading...</p>}

            <div className="movie-results">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} /> 
                ))}
            </div>

            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default Search;
