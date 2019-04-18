import {INITIAL_GENERAL_STATE, MainState} from '../states/main.state';
import {ADD_MOVIE_INTO_STORE, AppAction, COMMIT_EDITED_MOVIE_INTO_STORE, DELETE_MOVIE_FROM_STORE} from '../actions/action';

export function generalReducer(state: MainState = INITIAL_GENERAL_STATE, action: AppAction): any {

  let foundIndex: number;

  switch (action.type) {
    case ADD_MOVIE_INTO_STORE :
      const newState = Object.assign({}, state);
      newState.moviesList = [...state.moviesList];
      newState.moviesList.push(action.payload);
      return newState;
    case COMMIT_EDITED_MOVIE_INTO_STORE :
      foundIndex = state.moviesList.findIndex(movie => movie.id === action.payload.id);
      if (foundIndex >= 0) {
        state.moviesList[foundIndex] = action.payload;
        state.moviesList = [...state.moviesList];
      }
      return state;
    case DELETE_MOVIE_FROM_STORE :
      foundIndex = state.moviesList.findIndex(movie => movie.id === action.payload.id);
      if (foundIndex >= 0) {
        state.moviesList.splice(foundIndex, 1);
        state.moviesList = [...state.moviesList];
      }
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
}

