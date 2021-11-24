import React, { Component } from 'react';
import MovieItem from './movieitem';

class Movies extends Component {
    render() {
        //The map() method creates a new array populated with the results of calling a provided function 
        //on every element in the calling array.
        return this.props.films.map((film) => {
            {/* Data transfer between components */}
            return <MovieItem movie={film} key={film.imdbID} ReloadData={this.props.ReloadData}></MovieItem>
        })
    }
}
export default Movies;