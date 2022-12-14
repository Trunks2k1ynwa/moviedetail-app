import { Fragment, lazy, Suspense } from "react";
import Banner from "./components/banner/Banner";
import { Routes, Route } from "react-router-dom";
import Page404 from "./page/Page404";

const Main = lazy(() => import("./components/layout/Main"));
const HomePage = lazy(() => import("./page/HomePage"));
const MoviePageV2 = lazy(() => import("./page/MoviePageV2"));
const MovieDetailPage = lazy(() => import("./page/MovieDetailPage"));

function App() {
  return (
    <Fragment>
      <Suspense>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner type="upcoming"></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
          <Route path="*" element={<Page404></Page404>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
