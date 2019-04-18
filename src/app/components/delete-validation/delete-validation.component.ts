import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Movie} from '../../model/Movie';

@Component({
  selector: 'app-delete-validation',
  templateUrl: './delete-validation.component.html',
  styleUrls: ['./delete-validation.component.css']
})
export class DeleteValidationComponent implements OnInit {

  @Input() movie: Movie;

  constructor(public activeModal: NgbActiveModal,
              private movieService: MovieService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  delete() {
    this.movieService.deleteMovie(this.movie);
    this.activeModal.close(this.movie);
  }
}
