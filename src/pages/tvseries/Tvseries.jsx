import React from 'react';
import MovieList from '../movies/Movies'; 

const TVComponent = () => {
    const category = "tv";
    const title = "TV Series";
    return (
        <>
           
            <MovieList category={category} title={title} /> 
        </>
    );
};

export default TVComponent;
