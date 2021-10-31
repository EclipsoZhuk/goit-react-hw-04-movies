import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moviesFetchApi from '../../services/moviesFetchApi';
import s from './Reviews.module.css';
import Status from '../../services/statusLoader';
import scrollTo from '../../services/scrollTo';

export default function Reviews() {
    const { movieId } = useParams();
    const [status, setStatus] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        moviesFetchApi
            .getMovieReviews(movieId)
            .then(results => {
                if (results.length === 0) {
                    throw new Error(
                        'Sorry. But we have no reviews for this film yet!',
                    );
                }
                setReviews(results);
                setStatus(Status.RESOLVED);
                scrollTo();
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [movieId]);

    return (
        <>
            {status === Status.REJECTED && (
                <p className={s.content}>{error.message}</p>
            )}

            {status === Status.RESOLVED && (
                <ul className={s.item}>
                    {reviews.map(review => (
                        <li key={review.id} className={s.text}>
                            <h2 className={s.text}>{review.author}</h2>
                            <p className={s.content}> {review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
