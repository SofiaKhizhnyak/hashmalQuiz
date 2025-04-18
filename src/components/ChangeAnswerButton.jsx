import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function ChangeAnswerButton() {
  const { dispatch, canChangeAnswer, answer } = useQuiz();

  if (!answer || canChangeAnswer) return null; // Only show the button if an answer exists and changing is not allowed yet

  return (
    <button
      className="btn btn-ui btn-change"
      onClick={() => dispatch({ type: "allowChangeAnswer" })}
    >
      שנה תשובה
    </button>
  );
}

export default ChangeAnswerButton;
