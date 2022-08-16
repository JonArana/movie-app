import React from "react";

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex flex-nowrap justify-content-start my-5 mx-3 '>
                    <img src={movie.Poster} alt='movie'></img>
                    <div 
                        onClick={() => props.handleFavoritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'>
                        <FavoriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;