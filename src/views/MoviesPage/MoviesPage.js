import { useState, useEffect } from 'react';
import {
    Redirect,
    useRouteMatch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Status from '../../services/statusLoader';
import moviesFetchApi from '../../services/moviesFetchApi';
import SearchBar from '../../components/SearchBar';
import PageList from '../../components/PageList';

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

            {status === Status.REJECTED && <Redirect to="/error" />}
            {status === Status.RESOLVED && (
                <PageList movies={movies} url={url} location={location} />
            )}
        </>
    );
}
