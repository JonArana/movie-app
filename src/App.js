import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=86fcf45`;
    
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
  if(favorites.find(function (favorite) {return favorite.imdbID === movie.imdbID }) === undefined){
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);
		if (movieFavorites) {
			setFavorites(movieFavorites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};  

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
      console.log(newFavoriteList)
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };


	
	return (
		<div className='container-fliud movie-app'>
			<div className='row d-flex align-items-center my-4'>
          <MovieListHeading heading ='Movies' />
          <SearchBox searchValue ={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className='movie-list d-flex flex-row'>
            <MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorite}/>
			</div>
      <div className='row d-flex align-items-center my-4'>
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='movie-list d-flex flex-row'>
        <MovieList movies={favorites} handleFavoritesClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites} />
      </div>
		</div>
	);
};

export default App;
