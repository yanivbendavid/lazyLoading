import QuotesList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const Quotes = (props) => {
  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    return <p className="centered">{error}</p>;
  }

  if (status === "completed" && (!data || data.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuotesList quotes={data} />;
};

export default Quotes;
