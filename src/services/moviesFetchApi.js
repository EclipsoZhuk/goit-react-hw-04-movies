import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
    api_key: '852fc7857dec8cae6bf72d2a57c4072c',
    language: 'en-US',
};

async function getPopularMovies() {
    try {
        const { data } = await axios('trending/movie/day');
        return data.results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getSearchMoviesByWord(query) {
    try {
        const config = {
            url: `search/movie`,
            params: {
                query,
            },
        };
        const { data } = await axios(config, query);

        return data.results;
    } catch (error) {
        console.log('error', { error });
        return null;
    }
}

async function getCastInfo(id) {
    try {
        const config = {
            url: `movie/${id}/credits`,
        };
        const { data } = await axios(config, id);

        return data.cast;
    } catch (error) {
        console.log('error', { error });
        return null;
    }
}

async function getMovieReviews(id) {
    try {
        const config = {
            url: `movie/${id}/reviews`,
        };
        const { data } = await axios(config, id);
        return data.results;
    } catch (error) {
        console.log('error', { error });
        return null;
    }
}

async function getMovieById(id) {
    try {
        const config = {
            url: `movie/${id}`,
        };
        const { data } = await axios(config, id);

        return data;
    } catch (error) {
        console.log('error', { error });
        return null;
    }
}

const api = {
    getPopularMovies,
    getSearchMoviesByWord,
    getCastInfo,
    getMovieReviews,
    getMovieById,
};

export default api;
