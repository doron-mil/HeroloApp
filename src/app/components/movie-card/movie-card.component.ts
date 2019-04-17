import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MovieRecordEditorComponent} from '../movie-record-editor/movie-record-editor.component';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(MovieRecordEditorComponent);
    modalRef.componentInstance.movie = this.movie.clone();
    modalRef.componentInstance.isNew = false;
   }
}
