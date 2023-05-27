import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzNjMTI3MjRlNWEwNmNlY2EwMjNmNjYyZWU0YWUzMiIsInN1YiI6IjYxYTEzNTE0NmY0M2VjMDA0NTE1MTQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3kheQci00pxmjA0QMqgq_ZcgZyhE9QN2j5nmnukcUnw";

const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
