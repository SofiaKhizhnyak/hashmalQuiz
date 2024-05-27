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
            {isValidImageUrl(option) ? (
              <img
                style={{ width: "48px", height: "35px" }}
                src={option}
                alt={`Option ${index}`}
              />
            ) : (
              option
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
function isValidImageUrl(url) {
  // This regex pattern checks if the URL ends with common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
  return imageExtensions.test(url);
}

export default Options;
