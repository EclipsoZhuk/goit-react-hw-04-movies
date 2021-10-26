import React, { lazy, Suspense } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import routes from './routes';
import s from './styles/App.module.css';

const HomeView = lazy(() => import('./views/HomeView'));
const MoviesView = lazy(() => import('./views/MoviesView'));
const NotFoundView = lazy(() => import('./views/NotFoundView'));

export default function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <nav className={s.navigation}>
                    <div className={s.item}>
                        <NavLink
                            exact
                            to={routes.home}
                            className={s.link}
                            activeClassName={s.linkActive}
                        >
                            Home
                        </NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink
                            to={routes.movies}
                            className={s.link}
                            activeClassName={s.linkActive}
                        >
                            Movies
                        </NavLink>
                    </div>
                </nav>
                <hr />

                <Switch>
                    <Route exact path={routes.home} component={HomeView} />
                    <Route exact path={routes.movies} component={MoviesView} />
                    <Route component={NotFoundView} />
                </Switch>
            </Suspense>
        </div>
    );
}
