import React, {Component} from 'react';
import './App.css';
import SearchComponent from './SearchComponent';
import ResultComponent from "./ResultComponent";


interface AppState {
  query: string; //search input by the user
  filter: string; //filter chosen by the user
}


class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      query: "Iron Man",
      filter: "",
    };
  }

  //Update this.state with a new query and filter text.
  updateQuery = (newQuery: string, newFilter: string) => {
    this.setState({
      query: newQuery,
      filter: newFilter,
    });

  }

  render() {
    return (
        <div>
          <h1>Hello</h1>
          <SearchComponent onInputChange={this.updateQuery}/>
          <ResultComponent title={this.state.query} filter={this.state.filter}/>
        </div>
    )
  }


}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
