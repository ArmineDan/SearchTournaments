const searchResults = (state = [], action) => {
  if (action.type === "SET_SEARCH_RESULTS") {
    state = action.payload;
    return state;
  }
  return state;
};
export { searchResults };

const userChoice = (state = [], action) => {
  if (action.type === "ADD_TO_USER_CHOICE_LIST") {
    state.push(action.payload);
    return [...state];
  }
  if (action.type === "DELETE_ITEM") {
    let index = 0;
    for (const [i, el] of state.entries()) {
      if (el[0].id === action.payload) {
        index = i;
      }
    }
    state.splice(index, 1);
    return [...state];
  }
  if (action.type === "SET_COOKIE") {
    state = action.payload;
    return [...state];
  }
  return state;
};
export { userChoice };
