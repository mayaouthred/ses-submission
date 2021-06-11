import React, {Component} from 'react';
import Selection from './Selection';

interface ResultComponentProps {
    title: string, //the title the user want to search for
}

interface ResultComponentState {
    results: any; //a formatted list of ten or less buttons with the titles of the result's movies
    numResults: number; //number of total results for the search
    pageNumber: number; //the page number the results came from
    selectedTitle: string; //the title the movie the user has selected
    selectedID: string; //the ID of the movie the user has selected
}

class ResultComponent extends Component<ResultComponentProps, ResultComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            results: [],
            numResults: 0,
            pageNumber: 1,
            selectedTitle: "Iron Man",
            selectedID: "tt0371746"
        }
    }

    componentDidMount() {
        this.getMovieData(1);
    }

    //If title changed, reset page number and request data. If page number changed, re-request the data.
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title) {
            this.setState({
                pageNumber: 1,
            }, () => {
                this.getMovieData(this.state.pageNumber);
            });
        } else if (this.state.pageNumber !== prevState.pageNumber) {
            this.getMovieData(this.state.pageNumber);
        }

    }

    //Makes a query to the API using this.props.title and this.state.pageNumber. Sets this.state.results and
    // this.state.numResults accordingly.
    async getMovieData(page: number) {
        try {
            //Request a list of movies from the API.
            let response = await fetch("http://www.omdbapi.com/?s=" + encodeURI(this.props.title)
                +"&page="+ this.state.pageNumber +"&apikey=fa79688c");
            if (!response.ok) {
                alert("Bad status: " + response.status);
                return;
            }
            let result = await response.json();

            //If the response has search results, format into a list of button elements with the imdbID as the key.
            //Update state accordingly.
            if (result.Response === "True") {
                let movieTitles: any[] = result.Search;
                let parsedResult = movieTitles.map(movie => (
                        <li className="title-button">
                            <button onClick={this.onTitleButtonClick} key={movie.imdbID}
                                    value={movie.imdbID}><b>{movie.Title}</b></button>
                        </li>
                    ));

                this.setState({
                    results: parsedResult,
                    numResults: result.totalResults
                });

            } else {
                //Otherwise, indicate that the search was unsuccessful.
                this.setState({
                    results: <li>I'm sorry, I couldn't find anything for that search.</li>,
                    numResults: 0
                })
            }

        } catch (e) {
            alert("There was a problem connecting with the server.")
            console.log(e);
        }
    }

    //Increment this.state.pageNumber by one.
    onNextButtonClick = () => {
        if (Math.ceil(this.state.numResults / 10) > this.state.pageNumber) {
            let temp: number = this.state.pageNumber + 1;
            this.setState({
                pageNumber: temp
            })
        }

    }

    //Decrement the this.state.pageNumber by one.
    onPrevButtonClick = () => {
        if (this.state.pageNumber > 1) {
            let temp: number = this.state.pageNumber - 1;
            this.setState({
                pageNumber: temp
            })
        }
    }

    //Update which movie title is currently selected.
    onTitleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            selectedTitle: event.currentTarget.innerText,
            selectedID: event.currentTarget.value
        })
    }

    render() {
        return (
            <div className='inline-display'>
                <div id="titles-list">
                    <ul className="titles">{this.state.results}</ul>

                    <div id="pagination">
                    <button className='search-button' onClick={this.onPrevButtonClick}>Previous ten results</button>
                    <button className='search-button' onClick={this.onNextButtonClick}>Next ten results</button>
                    <p>Currently displaying results {this.state.pageNumber*10-9} through {Math.min(this.state.pageNumber*10,
                        this.state.numResults)} of {this.state.numResults}</p>
                    </div>
                </div>

                <Selection title={this.state.selectedTitle} id={this.state.selectedID}/>


            </div>
        )

    }

}

export default ResultComponent;