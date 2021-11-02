import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import baseImageURL from '../../services/baseImageURL';
import moviesFetchApi from '../../services/moviesFetchApi';
import noImageFound from '../../images/not_found.gif';
import s from './Cast.module.css';
import Loader from 'react-loader-spinner';
import Status from '../../services/statusLoader';

export default function Cast() {
    const { movieId } = useParams();
    const [actors, setActors] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        moviesFetchApi
            .getCastInfo(movieId)
            .then(cast => {
                setActors(cast);
                setStatus(Status.RESOLVED);
                window.scrollTo({
                    top: 575,
                    behavior: 'smooth',
                });
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [movieId, error]);

    return (
        <>
            {status === Status.PENDING && (
                <Loader
                    className="Spinner"
                    type="Circles"
                    color="#00BFFF"
                    height={300}
                    width={300}
                />
            )}

            {status === Status.REJECTED && <Redirect to="/error" />}

            {status === Status.RESOLVED && (
                <ul className={s.cast}>
                    {actors.map(actor => (
                        <li key={actor.id} className={s.item}>
                            <img
                                src={
                                    actor.profile_path
                                        ? `${baseImageURL}${actor.profile_path}`
                                        : noImageFound
                                }
                                alt={actor.original_name}
                                className={s.images}
                            />
                            <h3 className={s.name}>{actor.original_name}</h3>
                            <p className={s.character}>{actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
