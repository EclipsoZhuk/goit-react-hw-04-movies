import { useState, useEffect, Suspense, lazy } from 'react';
import {
    Redirect,
    NavLink,
    useParams,
    useRouteMatch,
    Route,
    useHistory,
    useLocation,
} from 'react-router-dom';
import moviesFetchApi from '../../services/moviesFetchApi';
import baseImageURL from '../../services/baseImageURL';
import noImageFound from '../../images/not_found.gif';
import Loader from 'react-loader-spinner';
import Status from '../../services/statusLoader';
import s from './MovieDetailsPage.module.css';
import MovieDetailsMainInfo from './MovieDetailsMainInfo';

const Cast = lazy(() =>
    import('../../components/Cast' /* webpackChunkName: "cast"*/),
);
const Reviews = lazy(() =>
    import('../../components/Reviews' /* webpackChunkName: "reviews"*/),
);

export default function MovieDetailsPage() {
    const location = useLocation();
    const history = useHistory();
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        setStatus(Status.PENDING);
        moviesFetchApi
            .getMovieById(movieId)
            .then(
                ({
                    poster_path,
                    original_title,
                    popularity,
                    overview,
                    genres,
                }) => {
                    setMovie({
                        src: poster_path
                            ? `${baseImageURL}${poster_path}`
                            : `${noImageFound}`,
                        title: original_title,
                        score: popularity.toFixed(1),
                        overview,
                        genres,
                    });
                    setStatus(Status.RESOLVED);
                },
            )
            .catch(error => {
                console.log(error);
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [movieId, error]);

    const goBack = () => {
        history.push(location?.state?.from ?? '/');
    };

    return (
        <>
            <button type="button" className={s.btn} onClick={goBack}>
                Go Back
            </button>
            <main className={s.container}>
                {status === Status.PENDING && (
                    <Loader
                        className="Spinner"
                        type="Circles"
                        color="#ca2b60"
                        height={300}
                        width={300}
                    />
                )}

                {status === Status.REJECTED && <Redirect to="/error" />}
                {status === Status.RESOLVED && (
                    <>
                        <MovieDetailsMainInfo movie={movie} />

                        <ul className={s.subMenu}>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: `${url}/cast`,
                                        state: {
                                            from: location.state
                                                ? location.state.from
                                                : '/',
                                        },
                                    }}
                                    className={s.subMenuItem}
                                    activeClassName={s.activeSubMenuItem}
                                >
                                    Cast
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: `${url}/reviews`,
                                        state: {
                                            from: location.state
                                                ? location.state.from
                                                : '/',
                                        },
                                    }}
                                    className={s.subMenuItem}
                                    activeClassName={s.activeSubMenuItem}
                                >
                                    Reviews
                                </NavLink>
                            </li>
                        </ul>

                        {
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
                                <Route path={`${path}/cast`}>
                                    <Cast />
                                </Route>
                                <Route path={`${path}/reviews`}>
                                    <Reviews />
                                </Route>
                            </Suspense>
                        }
                    </>
                )}
            </main>
        </>
    );
}
