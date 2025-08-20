const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
      <PageTitle title={pageTitle} />
      <Cinema name={cinema1Name} movies={[{title: cinema1Movie1Title, director: cinema1Movie1Director}, {title: cinema1Movie2Title, director: cinema1Movie2Director}]}/>
      <Cinema name={cinema2Name} movies={[{title: cinema2Movie1Title, director: cinema2Movie1Director}, {title: cinema2Movie2Title, director: cinema2Movie2Director}]}/>
    </div>
  );
};

interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

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
        <Movie title={props.movies[0].title} director={props.movies[0].director}/>
        <Movie title={props.movies[1].title} director={props.movies[1].director}/>
      </ul>
    </div>
  );
}

export default App;
