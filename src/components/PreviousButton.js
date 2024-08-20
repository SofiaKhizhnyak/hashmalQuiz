import { useQuiz } from "../contexts/QuizContext";

function PreviousButton() {
  const { dispatch, index } = useQuiz();

  if (index === 0) return null; // Disable the button on the first question

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "previousQuestion" })}
    >
      הקודם
    </button>
  );
}

export default PreviousButton;
