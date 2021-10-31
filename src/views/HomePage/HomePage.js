import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import notFound from '../../images/not_found.gif';
import moviesFetchApi from '../../services/moviesFetchApi';
import s from './HomePage.module.css';
import NotFoundPage from '../NotFoundPage';
import Status from '../../services/statusLoader';

export default function HomeView() {
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
            {status === Status.REJECTED && <NotFoundPage />}
            {status === Status.RESOLVED && (
                <>
                    <h1 className="Title"> Trending today</h1>
                    <ul className={s.list}>
                        {movies.map(({ id, poster_path, title }) => (
                            <li key={id} className={s.item}>
                                <Link to={{ pathname: `movies/${id}` }}>
                                    <img
                                        className={s.images}
                                        src={
                                            poster_path
                                                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                                : notFound
                                        }
                                        alt={title}
                                    />
                                </Link>
                                <div className={s.nameBox}>
                                    <p className={s.name}>{title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </main>
    );
}
