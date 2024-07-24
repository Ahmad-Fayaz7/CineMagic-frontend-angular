import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { IndexGenreComponent } from './components/genres/index-genre/index-genre.component';
import { HomeComponent } from './components/home/home.component';
import { CreateGenreComponent } from './components/genres/create-genre/create-genre.component';
import { IndexActorComponent } from './components/actors/index-actor/index-actor.component';
import { CreateActorComponent } from './components/actors/create-actor/create-actor.component';
import { IndexMovieTheaterComponent } from './components/movie-theater/index-movie-theater/index-movie-theater.component';
import { CreateMovieTheaterComponent } from './components/movie-theater/create-movie-theater/create-movie-theater.component';
import { CreateMovieComponent } from './components/movies/create-movie/create-movie.component';
import { FilterMovieComponent } from './components/movies/filter-movie/filter-movie.component';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { EditActorComponent } from './components/actors/edit-actor/edit-actor.component';
import { EditGenreComponent } from './components/genres/edit-genre/edit-genre.component';
import { EditMovieTheaterComponent } from './components/movie-theater/edit-movie-theater/edit-movie-theater.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movielist',
    component: MovieListComponent,
  },
  {
    path: 'movieslist',
    component: MovieListComponent,
  },
  {
    path: 'movies/create',
    component: CreateMovieComponent,
  },

  {
    path: 'movies/edit/:id',
    component: EditMovieComponent,
  },
  {
    path: 'movies/moviefilter',
    component: FilterMovieComponent,
  },
  {
    path: 'genres',
    component: IndexGenreComponent,
  },
  {
    path: 'genres/create',
    component: CreateGenreComponent,
  },
  {
    path: 'genres/edit/:id',
    component: EditGenreComponent,
  },
  {
    path: 'actors',
    component: IndexActorComponent,
  },
  {
    path: 'actors/create',
    component: CreateActorComponent,
  },
  {
    path: 'actors/edit/:id',
    component: EditActorComponent,
  },

  {
    path: 'movietheaters',
    component: IndexMovieTheaterComponent,
  },

  {
    path: 'movietheaters/create',
    component: CreateMovieTheaterComponent,
  },
  {
    path: 'movietheaters/edit/:id',
    component: EditMovieTheaterComponent,
  },
];
