import { useState, useEffect, Redirect } from 'react';
import Loader from 'react-loader-spinner';
import moviesFetchApi from '../../services/moviesFetchApi';
import Status from '../../services/statusLoader';
import PageList from '../../components/PageList';

export default function HomePage() {
    const [movies, setMovies] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [error, setError] = useState(null);

    useEffect(() => {
        setStatus(Status.PENDING);
        moviesFetchApi
            .getPopularMovies()
            .then(results => {
                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [error]);

    return (
        <main>
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
                    <h1 className="Title"> Trending today</h1>
                    <PageList movies={movies} url={'movies'} />
                </>
            )}
        </main>
    );
}
