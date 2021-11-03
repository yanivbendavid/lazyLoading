import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = lazy(() => import("./pages/NewQuote"));
const Quotes = lazy(() => import("./pages/Quotes"));
const QuoteDetails = lazy(() => import("./pages/QuoteDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const spinner = (
  <div className="centered">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={spinner}>
        <Switch>
          <Redirect path="/" exact to="/quotes" />
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
