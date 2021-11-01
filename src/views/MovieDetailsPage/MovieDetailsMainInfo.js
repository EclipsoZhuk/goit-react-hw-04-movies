import s from './MovieDetailsPage.module.css';

export default function MovieDetailsMainInfo({
    movie: { src, title, score, overview, genres },
}) {
    return (
        <div className={s.wrapper}>
            <img className={s.images} src={src} alt={title} />

            <div className={s.description}>
                <h2 className={s.movieTitle}>{title}</h2>

                <h3 className={s.title}>Score</h3>
                <p className={s.info}>{score}</p>

                <h3 className={s.title}>About</h3>
                <p className={s.info}>{overview}</p>

                <h3 className={s.title}>Genres</h3>

                <ul className={s.genre}>
                    {genres.map(({ id, name }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
