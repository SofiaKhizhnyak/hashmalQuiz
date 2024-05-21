import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch, status, categories } = useQuiz();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories");
        const res = await fetch(`http://localhost:9000/questions/`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("Fetched categories:", data);
        dispatch({ type: "categoriesReceived", payload: data });
        setLoading(false);
      } catch (err) {
        console.error("Fetching error:", err);
        dispatch({ type: "dataFailed" });
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCategorySelect = useCallback(
    (category) => {
      dispatch({ type: "selectCategory", payload: category });
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

  if (loading) return <div>Loading...</div>;

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
