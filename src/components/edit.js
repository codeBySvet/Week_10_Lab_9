import React, { Component } from 'react';
import axios from 'axios';  //gives us the ability to talk HTML(needed to process POST html requests)

// Class for the home page of the navbar containing the content of the component
class Edit extends Component {
    constructor() {
        super();
        //Binding events to constructor. It is required to perform handleSubmit and OnChange
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);

        //Assigning local variables from the state
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    //load data from a remote endpoint
    componentDidMount(){
        axios.get('http://localhost:4000/api/movies/'+ this.props.match.params.id)
        .then((response)=>{
            this.setState({
                Title:response.data.Title,
                Year:response.data.Year,
                Poster:response.data.Poster,
                _id:response.data._id
            })
        })
        .catch();
    }
    //This function will receive the form data 
    handleSubmit(event) {
        console.log("Name: " +this.state.Title+
        " Year: " + this.state.Year +
        "Poster: " + this.state.Poster);

        //when submitted, it assigned the entered values to local variables
        const NewMovie = {
            Title: this.state.Title,
            Year: this.state.Year,
            Poster: this.state.Poster
        }

        //This updates the data in the database using a put request
        axios.put('http://localhost:4000/api/movies/' + this.state._id, NewMovie)
        .then((response)=>{
            console.log(response)})
        .catch();
        
        //stop this method from being run when not called
        event.preventDefault();
        this.setState({
            Title:'',
            Year:'',
            Poster:''
        });
    }
    //update the state with the new name
    onChangeMovieName(event) {
        this.setState({
            Title: event.target.value
        })
    }
    //update the state with the new name
    onChangeMovieYear(event) {
        this.setState({
            Year: event.target.value
        })
    }
    //updat the state with the new poster
    onChangeMoviePoster(event){
        this.setState({
            Poster: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>This is my Edit Component!</h1>
                {/* When submitted, run this method */}
                <form onSubmit={this.handleSubmit}>

                    {/* Creating form input controls */}
                    <div className="form-group">
                        <label>Edit Movie Name: </label>
                        <input type="text"
                            className="form-control"
                            //value is equal to the state of the component
                            value={this.state.Title}
                            // Every time a change is submitted, it updates the state (allows text into the box)
                            onChange={this.onChangeMovieName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Movie Year: </label>
                        <input type="text"
                            className="form-control"
                            //value is equal to the state of the component
                            value={this.state.Year}
                            // Every time a change is submitted, it updates the state (allows text into the box)
                            onChange={this.onChangeMovieYear}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Movie Poster: </label>
                        <textarea type="text"
                            className="form-control"
                            //value is equal to the state of the component
                            value={this.state.Poster}
                            // Every time a change is submitted, it updates the state (allows text into the box)
                            onChange={this.onChangeMoviePoster}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Edit Movie"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Edit;