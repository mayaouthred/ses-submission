import React, {Component} from 'react';

interface SearchComponentProps {
    onInputChange(query: string, filter: string): void; //updates App.tsx with changes in SearchComponent state
}

interface SearchComponentState {
    text: any; //text input by the user
    filter: any; //filter chosen by the user
}

/**
 * A searchbar and filter that receives the user's query.
 */
class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            text: "Search...",
            filter: ""
        }
    }

    //Update the state to reflect the new search and update App.tsx with onInputChange.
    onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: event.target.value
        });
    }

    onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onInputChange(this.state.text, this.state.filter);
    }

    //Update the state to reflect the new search and update App.tsx with onInputChange.
    onFilterInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onInputChange(this.state.text, event.target.value);
    }

    render() {
        return (
            <div id="search-component">
                <label>
                    Search:
                    <input
                        value={this.state.text}
                        onChange={this.onSearchInputChange}
                        type="text"
                        />
                </label>
                <button onClick={this.onButtonClick}>Search</button>
            </div>
        )
    }





}

export default SearchComponent;