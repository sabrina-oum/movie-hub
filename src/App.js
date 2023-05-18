import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import PageNotFound from "./pages/PageNotFound";
import SearchResults from "./pages/SearchResults";
import RootLayout from "./pages/Root";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:mediaType/:id", element: <Details /> },
      { path: "/search/:query", element: <SearchResults /> },
      { path: "/explore/:mediaType", element: <Explore /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const fetchApiConfig = useCallback(() => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  }, [dispatch]);

  const genresCall = useCallback(async () => {
    const promises = [];
    const allGenres = [];

    ["movie", "tv"].forEach((media) =>
      promises.push(fetchDataFromApi(`/genre/${media}/list`))
    );

    const data = await Promise.all(promises);

    data.map(({ genres }) => genres.map((item) => (allGenres[item.id] = item)));

    dispatch(getGenres(allGenres));
  }, [dispatch]);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [fetchApiConfig, genresCall]);

  return <RouterProvider router={router} />;
};

export default App;
