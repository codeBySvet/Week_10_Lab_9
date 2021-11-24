import React, { Component } from 'react';
import Movies from './movies';
import axios from 'axios';

// Class for the home page of the navbar containing the content of the component
class Read extends Component
{

    constructor(){
        super();
        this.ReloadData=this.ReloadData.bind(this);
    }

    componentDidMount(){
        //Calling axios to perform a http get request from the desired URL and return a promise
        axios.get('http://localhost:4000/api/movies')
        //This is the promise. Once the data is obtained, then update the state
        .then((response)=>{
            
            //The following line of code is handy to quickly check the response foramt. 
            //alert(JSON.stringify(response, null, 10));

            this.setState({mymovies: response.data})
            
        })
        //This is going to be an error function if .then does not work
        .catch((error)=>{
            console.log(error);
        });
    }

    ReloadData(){
        //Same code as above, essentially loading in the data
        axios.get('http://localhost:4000/api/movies')
        .then((response)=>{
            this.setState({mymovies: response.data})          
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    //State is holding the data
    state = {
        mymovies: []            
    };
    
    //Page render 
    render(){
        return(
            <div>
                <h1>This is my Read component!</h1>
                {/* Data transfer between components */}
                <Movies films={this.state.mymovies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}
// Marking for export
export default Read;