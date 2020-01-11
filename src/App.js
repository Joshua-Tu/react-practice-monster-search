import React from "react";
import "./App.css";

import { CardList } from "./components/card-list/card-list.component";

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

  render() {
    const { monsters, searchFiled } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchFiled.toLowerCase())
    );

    return (
      <div className="App">
        <input
          type="search"
          placeholder="Search monsters"
          onChange={e => {
            this.setState({ searchFiled: e.target.value }, () =>
              console.log(this.state)
            );
          }}
          // value={this.state.searchFiled}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
