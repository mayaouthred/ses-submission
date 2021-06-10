import React, {Component} from 'react';

interface ResultComponentProps {
    title: string,
    filter: string
}

interface ResultComponentState {
    results: any[];
    numResults: number;
    pageNumber: number;
}

class ResultComponent extends Component<ResultComponentProps, ResultComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            results: [],
            numResults: 0,
            pageNumber: 1
        }
    }

    componentDidMount() {
        this.getMovieData(1);
    }

    //If title changed, reset page number and request data. If page number changed, re-request the data.
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title && this.state.pageNumber !== 1) {
            this.setState({
                pageNumber: 1,
            }, () => {
                this.getMovieData(this.state.pageNumber);
            });
        } else if (this.state.pageNumber !== prevState.pageNumber) {
            this.getMovieData(this.state.pageNumber);
        }

    }

    //Makes a query to the API using this.props.title and this.state.pageNumber. Sets this.state.results and this.state.numResults
    //accordingly.
    async getMovieData(page: number) {
        try {
            let response = await fetch("http://www.omdbapi.com/?s=" + encodeURI(this.props.title)
                +"&page="+ this.state.pageNumber +"&apikey=fa79688c");
            if (!response.ok) {
                alert("Bad status: " + response.status);
                return;
            }
            let result = await response.json();
            this.setState({
                results: result.Search,
                numResults: result.totalResults
            });
        } catch (e) {
            alert("There was a problem connecting with the server.")
            console.log(e);
        }
    }

    //Increment the pageNumber by one.
    onNextButtonClick = () => {
        if (this.state.numResults % 10 > this.state.pageNumber) {
            let temp: number = this.state.pageNumber + 1;
            this.setState({
                pageNumber: temp
            })
        }

    }

    //Decrement the page number by one.
    onPrevButtonClick = () => {
        if (this.state.pageNumber > 1) {
            let temp: number = this.state.pageNumber - 1;
            this.setState({
                pageNumber: temp
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.results.map(movie => (
                    <p key={movie.imdbID}>{movie.Title}</p>
                ))}
                <button onClick={this.onPrevButtonClick}>Previous 10 results</button>
                <button onClick={this.onNextButtonClick}>Next 10 results</button>
            </div>
        )

    }

}

export default ResultComponent;