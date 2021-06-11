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
