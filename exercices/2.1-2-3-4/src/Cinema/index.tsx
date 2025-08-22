import "./Cinema.css"

interface MovieProps {
  title: string;
  director: string;
}

const Movie = (props: MovieProps) => {
  return (
    <li>
      <strong>{props.title}</strong> - Réalisateur : {props.director}
    </li>
  );
};


interface CinemaProps {
  name: string;
  movies: MovieProps[];
}

const Cinema = (props: CinemaProps) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        {props.movies.map((movie, index) => (
          <Movie key={index} title={movie.title} director={movie.director} />
        ))}
      </ul>
    </div>
  );
};


export default Cinema;