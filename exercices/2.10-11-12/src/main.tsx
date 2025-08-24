import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CinemaPage from './components/pages/CinemaPage';
import MovieListPage from './components/pages/MovieListPage';
import AddMoviePage from './components/pages/AddMoviePage';
import MoviePage from './components/pages/MoviePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "cinemas",
        element: <CinemaPage />,
      },
      {
        path: "movie-list",
        element: <MovieListPage />,
      },
      {
        path: "add-movie",
        element: <AddMoviePage />,
      },
      {
        path: "movies/:movieId",
        element: <MoviePage />
      }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
