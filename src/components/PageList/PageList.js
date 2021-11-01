import s from './PageList.module.css';
import { Link } from 'react-router-dom';
import noImageFound from '../../images/not_found.gif';

export default function HomePageList({ movies, url, location }) {
    return (
        <ul className={s.list}>
            {movies.map(({ id, poster_path, title }) => (
                <li key={id} className={s.item}>
                    <Link
                        to={{
                            pathname: `${url}/${id}`,
                            state: { from: location },
                        }}
                    >
                        <img
                            className={s.images}
                            src={
                                poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                    : noImageFound
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
    );
}
