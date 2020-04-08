import React from 'react';

interface Movie {
    Title: string
    Poster: string
    Year: string
}

interface Props {
    movie: Movie
}

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie: React.FC<Props> = ({movie}) => {
    const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img width="200" src={poster} alt={`The movie titled: ${movie.Title}`} />
            </div>
            <p>({movie.Year})</p>
        </div>
    );
}

export default Movie;