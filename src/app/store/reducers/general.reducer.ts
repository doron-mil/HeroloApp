import {INITIAL_GENERAL_STATE, MainState} from '../states/main.state';
import {AppAction, ADD_MOVIE_INTO_STORE} from '../actions/action';

export function generalReducer(state: MainState = INITIAL_GENERAL_STATE, action: AppAction): any {

  switch (action.type) {
    case ADD_MOVIE_INTO_STORE :
      const newState = Object.assign({}, state);
      newState.moviesList = [...state.moviesList];
      newState.moviesList.push(action.payload);
      return newState;
    default:
      return Object.assign({}, state);
  }
}

