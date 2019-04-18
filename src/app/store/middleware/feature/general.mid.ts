import {Injectable} from '@angular/core';
import {API_ERROR, API_SUCCESS, apiRequest} from '../../actions/api.actions';
import {addMovieIntoStore, MOVIES_LIST_FEATURE, MOVIES_LIST_GET_DATA} from '../../actions/action';
import {Movie} from '../../../model/Movie';

const imdbMoviesIds = ['tt0111161', 'tt0167260', 'tt0110912', 'tt0108052', 'tt0137523', 'tt0073486', 'tt0816692', 'tt0120815',
  'tt0120689', 'tt0114369', 'tt0102926', 'tt1675434', 'tt0482571', 'tt0253474', 'tt0172495', 'tt0120586', 'tt0110357', 'tt0095765',
  'tt0078788', 'tt0032553', 'tt1853728', 'tt0405094'];

const omdbApiKey = 'ba6476f3';
const keyQuery = `&apikey=${omdbApiKey}`;

const BASIC_URL = 'https://www.omdbapi.com/';
const GET_MOVIE_DETAILS_URL = `${BASIC_URL}?i={keyQuery}`;

@Injectable()
export class GeneralMiddlewareService {
  constructor() {
  }

  convertMovieFromJson = (aPayload: any): Movie => {
    const newMovie = new Movie();
    newMovie.id = aPayload.imdbID;
    newMovie.title = aPayload.Title;
    newMovie.year = aPayload.Year;
    newMovie.runtime = aPayload.Runtime;
    newMovie.genre = aPayload.Genre;
    newMovie.director = aPayload.Director;
    return newMovie;
  };

  generalMiddleware = ({getState, dispatch}) => (next) => (action) => {
    next(action);

    switch (action.type) {
      case MOVIES_LIST_GET_DATA:
        imdbMoviesIds.forEach((imdbId: string) => {
          const url = `${BASIC_URL}?i=${imdbId}${keyQuery}`;
          next(
            apiRequest(null, 'GET', url, MOVIES_LIST_FEATURE, null)
          );
        });
        break;
      case `${MOVIES_LIST_FEATURE} ${API_SUCCESS}`:
        const movie = this.convertMovieFromJson(action.payload);
        next(
          addMovieIntoStore(movie)
        );
        break;
    }

    if (action.type.includes(API_ERROR)) {
      console.error('Error in  processing API middleware : ', action);
    }
  };
}
