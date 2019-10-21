import React from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { showList } from "../../animation";

import "./SearchInput.scss";

const cookie = new Cookies();
class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      searchState: []
    };
  }

  componentDidMount() {
    const { setCookie } = this.props;
    const getCookie = cookie.get("savedList") || [];
    if (getCookie.length) {
      showList(setCookie, getCookie);
    }
  }

  getData = async q => {
    const { setSearchResults } = this.props;
    try {
      const res = await axios.get(
        `https://api-search.wincafe.net/search?q=${q}&index=tournament`
      );
      const {
        data: [{ documents }]
      } = res;
      setSearchResults(documents);
      this.setState({
        searchState: documents
      });
      //  console.log(documents ? documents : 'no', "dataaaaaaaaaa")
    } catch (error) {
      console.error(error, "error-axios");
    }
  };

  addToTournamentList = e => {
    const { addToUserChoiceList, userCheckList } = this.props;
    const { searchState } = this.state;
    const id = e.currentTarget.id;

    const item = searchState.filter(el => el.id === id);
    if (item.length) {
      if (!userCheckList.length) {
        showList(addToUserChoiceList, item);
        cookie.set("savedList", [item], {
          path: "/",
          expires: new Date(Date.now() + 2592000)
        });

      } else {
        let isInCheckList = false;
        for (const el of userCheckList) {
          if (el[0].id === id) {
            isInCheckList = true;
            break;
          }
        }
        if (!isInCheckList) {
          addToUserChoiceList(item);
        }
        cookie.remove("savedList", { path: "/" });
        cookie.set("savedList", userCheckList, {
          path: "/",
          expires: new Date(Date.now() + 2592000)
        });
      }
    }
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = value => {
    const { searchResults } = this.props;

    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === "") {
      return [];
    }
    const regex = new RegExp(`\\b${escapedValue}`, "i");
    return searchResults.filter(person =>regex.test(this.getSuggestionValue(person)));
  };

  getSuggestionValue = suggestion => {
    return `${suggestion.title}`;
  };

  renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.title} `;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    return (
      <div
        id={suggestion.id}
        onClick={this.addToTournamentList}
        style={{ width: "100%" }}
      >
        <span className="suggestion-content">
          <span className="name">
            <div
              className="img"
              style={{
                backgroundImage:"url(http://www.fivb.org/Vis2009/Images/GetImage.asmx?type=press&no=88870)"
              }}
            />
            {/* <div className="img" style={{backgrundImage:`url(https//wincafe.net/${suggestion.images.default?suggestion.images.default.filePath:''})`}}/> */}

            {parts.map((part, index) => {
              const className = part.highlight ? "highlight" : null;
              return (
                <span className={className} key={index}>
                  {part.text}
                </span>
              );
            })}
          </span>
          <span className="description">{" " + suggestion.description}</span>
        </span>
      </div>
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length >= 2) {
      this.getData(value);
    }

    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange
    };
    // console.log(inputProps.value, "inputProps.value")

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

SearchInput.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  userCheckList: PropTypes.arrayOf(PropTypes.array),
  setSearchResults: PropTypes.func,
  addToUserChoiceList: PropTypes.func,
  setCookie: PropTypes.func
};

const mapStateToProps = store => ({
  searchResults: store.searchResults,
  userCheckList: store.userCheckList
});

const mapDispatchToProps = dispatch => ({
  setSearchResults: result => dispatch({ type: "SET_SEARCH_RESULTS", payload: result }),
  addToUserChoiceList: result => dispatch({ type: "ADD_TO_USER_CHOICE_LIST", payload: result }),
  setCookie: result => dispatch({ type: "SET_COOKIE", payload: result })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
