import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import s from './MoviesPage.module.css';
import Loader from 'react-loader-spinner';
import Status from '../../services/statusLoader';
import moviesFetchApi from '../../services/moviesFetchApi';
import SearchBar from '../../components/SearchBar';
import NotFoundPage from '../NotFoundPage';
import noImageFound from '../../images/not_found.gif';

export default function MoviesPage() {
    const history = useHistory();
    const location = useLocation();
    const { url } = useRouteMatch();

    const [query, setQuery] = useState('');
    const [status, setStatus] = useState(Status.IDLE);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const handleFormSubmit = newQuery => {
        if (newQuery === query) return;

        setQuery(newQuery);
        setMovies(null);
        setStatus(Status.IDLE);
        history.push({ ...location, search: `query=${newQuery}` });
    };

    useEffect(() => {
        if (location.search === '') return;

        const newSearch = new URLSearchParams(location.search).get('query');
        setQuery(newSearch);
    }, [location.search]);

    useEffect(() => {
        if (!query) return;

        setStatus(Status.PENDING);

        moviesFetchApi
            .getSearchMoviesByWord(query)
            .then(results => {
                if (results.length === 0) {
                    toast.error(`No movies found on ${query}.`);
                    setStatus(Status.REJECTED);
                    return;
                }

                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [query, error]);

    return (
        <>
            <SearchBar onSubmit={handleFormSubmit} />

            {status === Status.PENDING && (
                <Loader
                    className="Spinner"
                    type="Circles"
                    color="#ca2b60"
                    height={300}
                    width={300}
                />
            )}

            {status === Status.REJECTED && <NotFoundPage />}
            {status === Status.RESOLVED && (
                <>
                    <ul className={s.list}>
                        {movies.map(movie => (
                            <li key={movie.id} className={s.item}>
                                <Link
                                    to={{
                                        pathname: `${url}/${movie.id}`,
                                        state: { from: location },
                                    }}
                                >
                                    <img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                                : noImageFound
                                        }
                                        alt={movie.title}
                                        className={s.poster}
                                    />
                                </Link>
                                <div className={s.titleBox}>
                                    <p className={s.title}>{movie.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
