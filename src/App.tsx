import React, {Component} from 'react';
import './App.css';
import SearchComponent from './SearchComponent';
import ResultComponent from "./ResultComponent";


interface AppState {
  query: string; //search input by the user
}


class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      query: "Iron Man",
    };
  }

  //Update this.state with a new query and filter text.
  updateQuery = (newQuery: string) => {
    this.setState({
      query: newQuery,
    });

  }

  render() {
    return (
        <div>
          <h1>Hello</h1>
          <SearchComponent onInputChange={this.updateQuery}/>
          <ResultComponent title={this.state.query}/>
        </div>
    )
  }

}

export default App;
