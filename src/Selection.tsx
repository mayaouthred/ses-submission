import React, {Component} from 'react';

interface SelectionProps {
    title: string; //the title of the movie the user selected
    id: string; //the ID of the movie the user selected
}

interface SelectionState {
    movie: any; //an object holding the response from the API
}

/**
 * Displays the movie's associated information.
 */
class Selection extends Component<SelectionProps, SelectionState> {

    constructor(props: any) {
        super(props);
        this.state = {
            movie: {Title: 'Default',
                Released: "Default",
                Runtime: "Default",
                Genre: "Default",
                Director: "Default",
                Plot: "Default"}
        };
    }

    componentDidMount() {
        this.getTitleInformation();
    }

    //If the movie title changed, retrieve the new movie information.
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title) {
            this.getTitleInformation();
        }
    }

    //Makes a query to the API using this.props.title, stores the parsed result in this.state.movie.
    async getTitleInformation() {
        try {
            let response = await fetch("http://www.omdbapi.com/?t=" + encodeURI(this.props.title)
                +"&plot=full&apikey=fa79688c");
            if (!response.ok) {
                alert("Bad status: " + response.status);
                return;
            }
            let result = await response.json();

            //If the query isn't successful with the title, try searching with the ID instead.
            if (result.Response === "False") {
                let responseID = await fetch("http://www.omdbapi.com/?i=" + encodeURI(this.props.id)
                    +"&plot=full&apikey=fa79688c");
                if (!response.ok) {
                    alert("Bad status: " + response.status);
                    return;
                }
                result = await responseID.json();
            }

            this.setState({
                movie: result
            });

        } catch (e) {
            alert("There was a problem connecting to the server.");
            console.log(e);
        }
    }

    render() {
        return (
            <div id='selection'>
                <h1>{this.state.movie.Title}</h1>
                <p><b>Release date: </b>{this.state.movie.Released}</p>
                <p><b>Runtime: </b>{this.state.movie.Runtime}</p>
                <p><b>Genre: </b>{this.state.movie.Genre}</p>
                <p><b>Director: </b>{this.state.movie.Director}</p>
                <p>{this.state.movie.Plot}</p>
            </div>
        )
    }
}

export default Selection;