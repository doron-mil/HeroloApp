import {Injectable} from '@angular/core';
import {Movie} from '../model/Movie';
import {NgRedux} from '@angular-redux/store';
import {addMovieIntoStore, commitEditedMovie, deleteMovie} from '../store/actions/action';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private ngRedux: NgRedux<any>,
              private http: HttpClient) {
  }

  commitEditedMovie(aEditedMovie: Movie) {
    this.ngRedux.dispatch(commitEditedMovie(aEditedMovie));
  }

  addNewMovie(aNewMovie: Movie) {
    this.ngRedux.dispatch(addMovieIntoStore(aNewMovie));
  }

  checkTitleNotTaken(aTitle: string, aMovieId: string): Observable<boolean> {
    return this.http
      .get(`https://www.omdbapi.com/?t=${aTitle}&apikey=ba6476f3`).pipe(
        map((movie: { Title: string, imdbID: string }) =>
          !(movie.Title === aTitle && movie.imdbID !== aMovieId))
      );
  }

  deleteMovie(aMovieToDelete: Movie) {
    this.ngRedux.dispatch(deleteMovie(aMovieToDelete));
  }
}
