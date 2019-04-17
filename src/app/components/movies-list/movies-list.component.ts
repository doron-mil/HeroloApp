import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {getMoviesListData} from '../../store/actions/action';
import {StoreDataTypeEnum} from '../../store/storeDataTypeEnum';
import {Movie} from '../../model/Movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  moviesArray: Movie[];

  constructor(private ngRedux: NgRedux<any>) {
  }

  ngOnInit() {
    this.ngRedux.dispatch(getMoviesListData());
    this.subscribeToMovieList();
  }

  private subscribeToMovieList() {
    this.ngRedux.select<Movie[]>([StoreDataTypeEnum.GENERAL, 'moviesList'])
      .subscribe((aMoviesArray: Movie[]) => {
        this.moviesArray = aMoviesArray;
      });

  }
}
