import { useRef, useState } from "react";
import { Prompt } from "react-router";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const promptMessage = (location) => {
    return "Are you sure you want to leave the form?";
  };

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value.trim();
    const enteredText = textInputRef.current.value.trim();
    const quote = { author: enteredAuthor, text: enteredText };
    
    if (enteredAuthor.length === 0 || enteredText.length === 0) {
      return;
    }

   props.onAddQuote(quote);
  }

  return (
    <Card>
      <Prompt when={isEntering} message={promptMessage} />
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
        onFocus={() => {
          setIsEntering(true);
        }}
      >
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea id="text" rows="5" ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button
            className="btn"
            onClick={() => {
              setIsEntering(false);
            }}
          >
            Add Quote
          </button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
