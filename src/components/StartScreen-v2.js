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

    return categories.map((category, index) => {
      let buttonText;
      switch (index + 1) {
        case 17:
          buttonText = "מכשירים א";
          break;
        case 18:
          buttonText = "מכשירים ב";
          break;
        case 19:
          buttonText = "מכשירים ג";
          break;
        case 20:
          buttonText = "קבלים";
          break;
        default:
          buttonText = `${index + 1} פרק `;
      }

      return (
        <button
          key={index}
          className="btn btn-ui"
          onClick={() => handleCategorySelect(index)}
        >
          {buttonText}
        </button>
      );
    });
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
