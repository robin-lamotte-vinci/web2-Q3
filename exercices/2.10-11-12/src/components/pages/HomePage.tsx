import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="homepage-container">
            <h1>Bienvenue sur iMovies</h1>
            <p>
                iMovies est une application qui vous permet de découvrir facilement les cinémas disponibles ainsi qu'une liste de films à l'affiche.
            </p>
            <ul>
                <li>Page d'accueil pour vous présenter l'application</li>
                <li>Page dédiée à l'affichage de plusieurs cinémas</li>
                <li>Page présentant une liste de films</li>
            </ul>
        </div>
    );
};

export default HomePage;