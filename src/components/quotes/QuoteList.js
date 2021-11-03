import { Fragment } from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useHistory, useLocation } from "react-router";

const sortQuotes = (q, asc) => {
  const sortedQuotes = q.sort((a, b) => {
    if (asc) {
      return a.id > b.id ? 1 : -1;
    } else {
      return a.id < b.id ? 1 : -1;
    }
  });
  return sortedQuotes;
};

const QuoteList = (props) => {
  const location = useLocation();
  const orderQuery = new URLSearchParams(location.search).get("order");
  const isAsc = orderQuery !== "desc";
  const history = useHistory();
  const quotes =  sortQuotes(props.quotes, isAsc);
  const setSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `order=${isAsc ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <ul className={classes.list}>
        <div className={classes.sorting}>
          <button onClick={setSortHandler}>
            Sort {isAsc ? "descending" : "ascending"}
          </button>
        </div>
        {quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
