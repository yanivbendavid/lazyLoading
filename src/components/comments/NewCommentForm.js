import { useRef, useEffect } from "react";
import useHttp, { statusTypes } from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { status, sendRequest, error } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === statusTypes.completed && !error) {
      onAddedComment();
    }
  }, [onAddedComment, error, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const commentText = commentTextRef.current.value;
    if (commentText.length === 0) {
      return;
    }

    sendRequest({ quoteId: props.quoteId, commentData: { text: commentText } });
  };

  if (status === statusTypes.pending) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
