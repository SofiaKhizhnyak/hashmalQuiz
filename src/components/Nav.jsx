import React from "react";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import { useQuiz } from "../contexts/QuizContext";

function Nav() {
  const { index, numQuestions } = useQuiz();

  return (
    <div className="button-wrapper">
      <div className="btn-previous-container">
        {index > 0 && <PreviousButton className="btn-previous" />}
      </div>
      {/*  {hasAnswered && !canChangeAnswer && <ChangeAnswerButton />} */}
      <div className="btn-next-container">
        {index < numQuestions && <NextButton className="btn-next" />}
      </div>
    </div>
  );
}

export default Nav;
