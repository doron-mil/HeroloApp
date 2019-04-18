import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Movie} from '../../model/Movie';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../../services/movie.service';
import {TitleValidationDirective} from '../../shared/title-validation.directive';

@Component({
  selector: 'app-movie-record-editor',
  templateUrl: './movie-record-editor.component.html',
  styleUrls: ['./movie-record-editor.component.css']
})
export class MovieRecordEditorComponent implements OnInit {

  @Input() movie: Movie;
  @Input() isNew: boolean;

  editMovieForm: FormGroup;

  minYear = 1888;
  maxYear: number;

  constructor(public activeModal: NgbActiveModal,
              private movieService: MovieService,
              private titleValidation: TitleValidationDirective) {
  }

  ngOnInit() {
    const today = new Date();
    this.maxYear = today.getUTCFullYear();

    this.editMovieForm = new FormGroup({
      title: new FormControl(this.movie.title, [
          Validators.required
        ],
        this.titleValidation.titleValidator(this.movie.id)
      ),
      director: new FormControl(this.movie.director, Validators.required),
      year: new FormControl(this.movie.year,
        [
          Validators.required,
          Validators.min(this.minYear),
          Validators.max(this.maxYear)]),
      runtime: new FormControl(this.movie.runtime, Validators.required),
      genre: new FormControl(this.movie.genre, Validators.required)
    });
  }

  submitData() {
    Object.assign(this.movie, this.editMovieForm.value);
    if (this.isNew) {
      this.movieService.addNewMovie(this.movie);
    } else {
      this.movieService.commitEditedMovie(this.movie);
    }
    this.activeModal.close(this.movie);
  }

  closeModal() {
    this.activeModal.dismiss('');
  }

  get title() {
    return this.editMovieForm.get('title');
  }

  get director() {
    return this.editMovieForm.get('director');
  }

  get year() {
    return this.editMovieForm.get('year');
  }

  get runtime() {
    return this.editMovieForm.get('runtime');
  }

  get genre() {
    return this.editMovieForm.get('genre');
  }

}
