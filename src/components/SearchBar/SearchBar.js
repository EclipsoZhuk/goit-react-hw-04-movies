import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState('');

    const handleQueryChange = e => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            toast.warn(`Oops, enter your query!!!`);
            return;
        }
        onSubmit(query);
        setQuery('');
    };

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <button type="submit" className={s.submitButton}>
                <span className={s.label}>Search</span>
            </button>

            <input
                className={s.input}
                type="text"
                value={query}
                autoComplete="off"
                autoFocus
                placeholder="Search ..."
                onChange={handleQueryChange}
            />
        </form>
    );
}

SearchBar.protTypes = {
    onSubmit: PropTypes.func.isRequired,
};
