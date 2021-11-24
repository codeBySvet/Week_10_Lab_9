import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


// Class to hold and format the display of indevidual movie items
class MovieItem extends Component {

    constructor() {
        super();
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    //Method for the delete button. This method sends http delete request to server
    DeleteMovie(e) {
        //This makes the event cancelable - which is a risk when the page laods up.
        e.preventDefault();


        console.log("Delete: " + this.props.movie._id)
        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
            .then(()=>{
                //Calls the ReloadData method from the /movies component and that continues up to the /read component
                this.props.ReloadData();
            })
            .catch();
    }



    render() {
        return (
            <div>
                {/* Using built in react component to format display  */}
                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.movie.Poster}></img>
                            <footer>
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        );
    }
}
// Marking for export
export default MovieItem;