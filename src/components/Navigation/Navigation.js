import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
    return (
        <>
            <header>
                <nav className={s.navigation}>
                    <div className={s.item}>
                        <NavLink
                            exact
                            to="/"
                            className={s.link}
                            activeClassName={s.linkActive}
                        >
                            Home
                        </NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink
                            to="/movies"
                            className={s.link}
                            activeClassName={s.linkActive}
                        >
                            Movies
                        </NavLink>
                    </div>
                </nav>
            </header>
            <hr />
        </>
    );
}
