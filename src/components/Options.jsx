import { useQuiz } from "../contexts/QuizContext";
import MathJax from "./MathJax";

function Options({ question }) {
  const { dispatch, answer, canChangeAnswer } = useQuiz();
  const hasAnswered = answer !== null;

  const renderOption = (option) => {
    if (isValidImageUrl(option)) {
      return (
        <img
          style={{ width: "20rem", height: "10rem" }}
          src={option}
          alt="Option"
        />
      );
    } else if (isMathJaxOption(option)) {
      return <MathJax>{`\\(${option}\\)`}</MathJax>;
    } else {
      return option;
    }
  };

  return (
    <>
      <div style={{ direction: "rtl", textAlign: "right" }}>
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
              disabled={hasAnswered && !canChangeAnswer}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {renderOption(option)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
function isValidImageUrl(url) {
  // This regex pattern checks if the URL ends with common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
  return imageExtensions.test(url);
}

function isMathJaxOption(option) {
  // Check if the option contains LaTeX syntax
  return (
    option.includes("\\frac") ||
    option.includes("\\cdot") ||
    option.includes("10^") ||
    option.includes("\\sqrt")
  );
}

export default Options;
