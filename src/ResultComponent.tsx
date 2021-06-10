import React, {Component} from 'react';

interface ResultComponentProps {
    title: string,
    filter: string
}

interface ResultComponentState {
    results: any[];
}

class ResultComponent extends Component<ResultComponentProps, ResultComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title) {
            this.getMovieData();
        }
    }

    async getMovieData() {
        try {
            let response = await fetch("http://www.omdbapi.com/?s=" + encodeURI(this.props.title) + "&apikey=fa79688c");
            if (!response.ok) {
                alert("Bad status: " + response.status);
                return;
            }
            let result = await response.json();
            this.setState({
                results: result.Search
            });
        } catch (e) {
            alert("There was a problem connecting with the server.")
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.results.map(movie => (
                    <p key={movie.imdbID}>{movie.Title}</p>
                ))}
            </div>
        )

    }

}

export default ResultComponent;