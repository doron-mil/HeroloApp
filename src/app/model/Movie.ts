export class Movie {
  id: string;
  title: string;
  year: number;
  runtime: string;
  genre: string;
  director: string;

  clone(): Movie {
    const newMovie = new Movie();
    newMovie.id = this.id;
    newMovie.title = this.title;
    newMovie.year = this.year;
    newMovie.runtime = this.runtime;
    newMovie.genre = this.genre;
    newMovie.director = this.director;
    return newMovie;
  }
}
