import { useEffect } from "react";
import { useHistory } from "react-router";
import QuoteFrom from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = (props) => {
  const history = useHistory();
  const { status, sendRequest } = useHttp(addQuote);
  const isLoading = status === "pending";

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };

  return <QuoteFrom onAddQuote={addQuoteHandler} isLoading={isLoading} />;
};

export default NewQuote;
