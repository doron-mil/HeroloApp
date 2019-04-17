import {Component} from '@angular/core';
import {MovieService} from './services/movie.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MovieRecordEditorComponent} from './components/movie-record-editor/movie-record-editor.component';
import {Movie} from './model/Movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: NgbModal) {
  }

  static idForUse = 1;
  title = 'HeroloApp';

  addMovie() {
    const modalRef = this.modalService.open(MovieRecordEditorComponent);
    modalRef.componentInstance.movie = this.generateNewMovie();
    modalRef.componentInstance.isNew = true;
  }

  private generateNewMovie(): Movie {
    const newMovie = new Movie();
    newMovie.id = AppComponent.idForUse++;
    return newMovie;
  }
}
