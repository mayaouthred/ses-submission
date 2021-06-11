import React, {Component} from 'react';

interface SelectionProps {
    title: string;
}

interface SelectionState {
    movie: any;
}

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

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title) {
            this.getTitleInformation();
        }
    }

    async getTitleInformation() {
        try {
            let response = await fetch("http://www.omdbapi.com/?t=" + encodeURI(this.props.title)
                +"&plot=full&apikey=fa79688c");
            if (!response.ok) {
                alert("Bad status: " + response.status);
                return;
            }

            let result = await response.json();
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
                <p>Release date: {this.state.movie.Released}</p>
                <p>Runtime: {this.state.movie.Runtime}</p>
                <p>Genre: {this.state.movie.Genre}</p>
                <p>Director: {this.state.movie.Director}</p>
                <p>{this.state.movie.Plot}</p>
            </div>
        )
    }
}

export default Selection;