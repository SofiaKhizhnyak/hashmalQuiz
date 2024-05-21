import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch, status } = useQuiz();

  const [questionsArray, setQuestionsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      fetch(`http://localhost:9000/questions/`)
        .then((res) => res.json())
        .then((data) => {
          setQuestionsArray(data);
          setLoading(false);
        })
        .catch((err) => {
          dispatch({ type: "dataFailed" });
          setLoading(false);
        });
    },
    [dispatch]
  );

  const handleCategorySelect = (category) => {
    dispatch({ type: "selectCategory", payload: category });
    dispatch({ type: "start" });
  };

  if (status !== "ready" || loading) return null;

  return (
    <div className="start">
      <h2>שאלות תרגול למבחן בחשמל</h2>
      {/* <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        התחל
      </button> */}
      <h3> בחר את הפרק שברצונך לתרגל </h3>
      <div className="category-buttons">
        {questionsArray.map((curr, index) => (
          <button
            key={crypto.randomUUID()}
            className="btn btn-ui"
            onClick={() => {
              handleCategorySelect(index);
            }}
          >
            פרק {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartScreen;
