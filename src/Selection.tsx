import React, {Component} from 'react';

interface SelectionProps {
    title: string; //the title of the movie the user selected
    id: string; //the ID of the movie the user selected
}

interface SelectionState {
    movie: any; //an object holding the response from the API
    poster: HTMLImageElement | null; //the movie's poster
}

/**
 * Displays details from the selected title.
 */
class Selection extends Component<SelectionProps, SelectionState> {

    canvas: React.RefObject<HTMLCanvasElement>; //the canvas to draw the poster on

    constructor(props: any) {
        super(props);
        this.state = {
            movie: {Title: 'Default',
                Released: "Default",
                Runtime: "Default",
                Genre: "Default",
                Director: "Default",
                Plot: "Default"},
            poster: null
        };
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.getTitleInformation();
    }

    //If the movie title changed, retrieve the new movie information. If the poster changed,
    //redraw the canvas.
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.title !== prevProps.title) {
            this.getTitleInformation();
        }
        if (this.state.poster !== prevState.poster) {
            this.draw();
        }
    }

    //Makes a query to the API using this.props.title, stores the parsed result in this.state.movie.
    async getTitleInformation() {
        try {
            //First, try querying with the title.
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

            //Update state. When complete, it's safe to load the image for the poster.
            this.setState({
                movie: result
            }, () => {
                this.fetchAndSaveImage();
            });

        } catch (e) {
            alert("There was a problem connecting to the server.");
            console.log(e);
        }
    }

    //If this movie has a poster, load an new HTMLImageElement in this.state.poster and set
    //its source.
    fetchAndSaveImage() {
        if (this.state.movie.Poster === "N/A") {
            this.setState( {
                poster: null
            });
            return;
        }
        let poster: HTMLImageElement = new Image();
        poster.onload = () => {
            this.setState({
                poster: poster
            })
        }
        poster.src = this.state.movie.Poster;
    }

    //Clears the current canvas and if the poster exists, draws the poster.
    draw() {
        let canvas = this.canvas.current;
        if (canvas === null) throw Error("No canvas reference.");
        let ctx = canvas.getContext("2d");
        if (ctx === null) throw Error("Can't draw, no graphics context.");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.state.poster !== null) {
            canvas.width = this.state.poster.width;
            canvas.height = this.state.poster.height;
            ctx.drawImage(this.state.poster, 0, 0);
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
                <canvas ref={this.canvas}/>
            </div>
        )
    }
}

export default Selection;