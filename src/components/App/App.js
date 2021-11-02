import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Navigation from '../Navigation';

const HomePage = lazy(() =>
    import('../../views/HomePage' /* webpackChunkName: "home-page"*/),
);
const MoviesPage = lazy(() =>
    import('../../views/MoviesPage' /* webpackChunkName: "movies-page"*/),
);
const MovieDetailsPage = lazy(() =>
    import(
        '../../views/MovieDetailsPage' /* webpackChunkName: "movie-details-page"*/
    ),
);
const NotFoundView = lazy(() =>
    import('../../views/NotFoundPage' /* webpackChunkName: "not-found-view"*/),
);

export default function App() {
    return (
        <>
            <Navigation />

            <Suspense
                fallback={
                    <Loader
                        className="Spinner"
                        type="Circles"
                        color="#ca2b60"
                        height={300}
                        width={300}
                    />
                }
            >
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/movies">
                        <MoviesPage />
                    </Route>
                    <Route path="/movies/:movieId">
                        <MovieDetailsPage />
                    </Route>
                    <Route path="/error" component={NotFoundView} />
                    <Redirect to="/error" />
                </Switch>
            </Suspense>

            <ToastContainer
                autoClose={3000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
