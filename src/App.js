import React from "react";
import "./App.scss";
import SearchInput from "./Components/searchInput/SearchInput";
import UserChoiceList from "./Components/userChoiceList/UserChoiceList";

function App() {
  return (
    <div className="main">
      <header className="header">
        <SearchInput />
      </header>
      <UserChoiceList />
    </div>
  );
}

export default App;
