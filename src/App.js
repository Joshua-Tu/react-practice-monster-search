import React from "react";

import { CardList } from "./components/card-list/card-list.component";
// import { SearchBox } from "./components/search-box/search-box.component";
import "./components/search-box/search-box.styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFiled: ""
    };
  }

  componentDidMount() {
    try {
      (async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();
        this.setState({ monsters: users });
      })();
    } catch (err) {
      throw "Error: " + err;
    }
  }

  handleChange = e => {
    this.setState({ searchFiled: e.target.value });
  };

  render() {
    const { monsters, searchFiled } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchFiled.toLowerCase())
    );

    return (
      <div className="App">
        <input
          className="search"
          type="search"
          placeholder="search monsters"
          onChange={this.handleChange}
        />
        {/* <SearchBox
          placeholder="search monsters"
          handleChange={e => this.setState({ searchFiled: e.target.value })}
        /> */}
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
