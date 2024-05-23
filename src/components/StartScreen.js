import React, { useCallback, useMemo } from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch, status, categories } = useQuiz();

  const handleCategorySelect = useCallback(
    (categoryIndex) => {
      dispatch({ type: "selectCategory", payload: categoryIndex });
      dispatch({ type: "start" });
    },
    [dispatch]
  );

  const categoryButtons = useMemo(() => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category, index) => (
      <button
        key={index}
        className="btn btn-ui"
        onClick={() => handleCategorySelect(index)}
      >
        פרק {index + 1}
      </button>
    ));
  }, [categories, handleCategorySelect]);

  if (status !== "categoriesReady") return null;

  return (
    <div className="start">
      <h2>שאלות תרגול למבחן בחשמל</h2>
      <h3>בחר את הפרק שברצונך לתרגל</h3>
      <div className="category-buttons">{categoryButtons}</div>
    </div>
  );
}

export default StartScreen;
