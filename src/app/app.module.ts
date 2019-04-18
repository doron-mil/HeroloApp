import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';

import {AppComponent} from './app.component';
import {GeneralMiddlewareService} from './store/middleware/feature/general.mid';
import {ApiMiddlewareService} from './store/middleware/core/api.mid';
import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import {StoreDataTypeEnum} from './store/storeDataTypeEnum';
import {generalReducer} from './store/reducers/general.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {MovieCardComponent} from './components/movie-card/movie-card.component';
import {MovieRecordEditorComponent} from './components/movie-record-editor/movie-record-editor.component';
import {TitleValidationDirective} from './shared/title-validation.directive';
import {DeleteValidationComponent} from './components/delete-validation/delete-validation.component';
import {RemoveNonEnglishPipe} from './shared/remove-non-english.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieCardComponent,
    MovieRecordEditorComponent,
    TitleValidationDirective,
    DeleteValidationComponent,
    RemoveNonEnglishPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgReduxModule,
  ],
  providers: [ApiMiddlewareService, GeneralMiddlewareService, TitleValidationDirective],
  entryComponents: [MovieRecordEditorComponent, DeleteValidationComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<any>,
              private devTools: DevToolsExtension,
              private generalMiddlewareService: GeneralMiddlewareService,
              private apiMiddlewareService: ApiMiddlewareService) {

    const featureMiddleware = [
      generalMiddlewareService.generalMiddleware,
    ];

    const coreMiddleware = [
      apiMiddlewareService.apiMiddleware,
    ];

    const rootReducer = combineReducers({
      [StoreDataTypeEnum.GENERAL]: generalReducer,
    });

    const store: Store = createStore(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(...featureMiddleware, ...coreMiddleware)
      )
    );

    ngRedux.provideStore(store);


  }
}
