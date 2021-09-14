import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

type State = {
  query: string;
  movies: Movie[];
};

export class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    movies: [...moviesFromServer],
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { query } = this.state;

    this.setState({
      query: value,

      movies: moviesFromServer.filter(movie => (
        movie.title.toLowerCase().includes(query.toLowerCase().trim())
        || movie.description.toLowerCase().includes(query)
      )),
    });
  };

  render() {
    return (
      <div className="page">
        <div className="page-content">
          <form
            method="post"
            className="box"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="field">
              <label htmlFor="search-query" className="label">
                Search movie
              </label>

              <div className="control">
                <input
                  type="text"
                  id="search-query"
                  className="input"
                  placeholder="Type search word"
                  value={this.state.query}
                  onChange={this.handleChange}
                />
              </div>

            </div>
          </form>

          <MoviesList movies={this.state.movies} />
        </div>
        <div className="sidebar">
          Sidebar goes here
        </div>
      </div>
    );
  }
}
