import {Movie} from '../../model/Movie';

export interface MainState {
  moviesList: Movie[];
}

export const INITIAL_GENERAL_STATE: MainState = {
  moviesList: [],
};
