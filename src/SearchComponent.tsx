import React, {Component} from 'react';

interface SearchComponentProps {
    onInputChange(query: string): void; //updates App.tsx with changes in SearchComponent state
}

interface SearchComponentState {
    text: any; //text input by the user
}

/**
 * A search bar that receives the user's query.
 */
class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            text: "What movie are you thinking of?",
        }
    }

    //Update the state to reflect the new search text.
    onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: event.target.value
        });
    }

    //Updates App.tsx with the new query.
    onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onInputChange(this.state.text);
    }

    render() {
        return (
            <div className='inline-display'>
                    <input id="search-bar"
                        value={this.state.text}
                        onChange={this.onSearchInputChange}
                        type="text"
                        />
                <button className="search-button" onClick={this.onButtonClick}>Search</button>
            </div>
        )
    }





}

export default SearchComponent;