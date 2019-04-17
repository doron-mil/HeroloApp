import {Injectable} from '@angular/core';
import {Movie} from '../model/Movie';
import {NgRedux} from '@angular-redux/store';
import {addMovieIntoStore, commitEditedMovie} from '../store/actions/action';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

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
      .get(`http://www.omdbapi.com/?t=${aTitle}&apikey=ba6476f3`).pipe(
        // map(res => res.json()),
        map(movie => !(movie.Title === aTitle && movie.imdbID !== aMovieId))
      );
  }

}
