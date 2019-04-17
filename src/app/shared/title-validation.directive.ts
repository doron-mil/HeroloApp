import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {MovieService} from '../services/movie.service';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appTitleValidation]'
})
export class TitleValidationDirective {

  constructor(private movieService: MovieService) {
  }

  titleValidator(aMovieId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (!control.dirty && !control.touched) {
        return of(null);
      }
      return this.movieService.checkTitleNotTaken(control.value,aMovieId).pipe(
        map(res => {
          return res ? null : {titleTaken: true};
        }));
    };
  }

}
