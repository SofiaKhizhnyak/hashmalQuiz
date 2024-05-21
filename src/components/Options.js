import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`to-right btn btn-option ${
              index === answer ? "answer" : ""
            } ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={crypto.randomUUID()}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
