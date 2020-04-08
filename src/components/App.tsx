import React, {useReducer, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

interface State {
  loading: boolean
  movies: Array<Movie>
  errorMessage: string | null
};

const initialState: State = {
  loading: true,
  movies: [],
  errorMessage: null
};

enum ActionType {
  REQUEST = "SEARCH_MOVIES_REQUEST",
  SUCESS = "SEARCH_MOVIES_SUCESS",
  FAILURE = "SEARCH_MOVIES_FAILURE",
}

interface Action {
  type: ActionType,
  payload?: Array<Movie>,
  error?: string 
}

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case ActionType.SUCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload ?? []
      }
    case ActionType.FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error ?? null
      }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        const movies: Array<Movie> = jsonResponse.Search;
        dispatch({
          type: ActionType.SUCESS,
          payload: movies
        });
      });
  }, [])

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.REQUEST
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          const movies: Array<Movie> = jsonResponse.Search;
          dispatch({
            type: ActionType.SUCESS,
            payload: movies
          });
        } else {
          const error = jsonResponse.Error;
          dispatch({
            type: ActionType.FAILURE,
            error: error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )}
      </div>
    </div>
  );
}

export default App;
