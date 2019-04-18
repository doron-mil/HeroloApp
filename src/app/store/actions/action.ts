import {Action} from 'redux';
import {Movie} from '../../model/Movie';


export const MOVIES_LIST_FEATURE = '[MOVIES_LIST]';

export const MOVIES_LIST_GET_DATA = 'MOVIES_LIST_GET_DATA';
export const ADD_MOVIE_INTO_STORE = 'ADD_MOVIE_INTO_STORE';
export const COMMIT_EDITED_MOVIE_INTO_STORE = 'COMMIT_EDITED_MOVIE_INTO_STORE';
export const DELETE_MOVIE_FROM_STORE = 'DELETE_MOVIE_FROM_STORE';

export interface AppAction extends Action {
  payload: any;
}

// action creators
export const getMoviesListData = () => ({
  type: MOVIES_LIST_GET_DATA,
  meta: {feature: MOVIES_LIST_FEATURE}
});

export const addMovieIntoStore = (movie: Movie) => ({
  type: ADD_MOVIE_INTO_STORE,
  payload: movie,
});

export const commitEditedMovie = (movie: Movie) => ({
  type: COMMIT_EDITED_MOVIE_INTO_STORE,
  payload: movie,
});

export const deleteMovie = (movie: Movie) => ({
  type: DELETE_MOVIE_FROM_STORE,
  payload: movie,
});
