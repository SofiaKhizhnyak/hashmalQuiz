import React, { createContext, useEffect, useContext, useReducer } from "react";
import { questionsData } from "./questions";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  selectedCategory: null,
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "selectCategory":
      return { ...state, selectedCategory: action.payload };
    case "categoriesReceived":
      return {
        ...state,
        categories: action.payload,
        status: "categoriesReady",
      };
    case "restart":
      return {
        ...initialState,
        categories: state.categories,
        status: "categoriesReady",
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      selectedCategory,
      categories,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    const fetchCategories = () => {
      try {
        console.log("Fetching categories");
        // Assuming categories are already available as nested arrays in questionsData
        const categories = questionsData.map((category, index) => index);
        console.log("Fetched categories:", categories);
        dispatch({ type: "categoriesReceived", payload: categories });
      } catch (err) {
        console.error("Fetching categories error:", err);
        dispatch({ type: "dataFailed" });
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      const fetchQuestions = () => {
        try {
          console.log(`Fetching questions for category ${selectedCategory}`);
          // Adjusting selectedCategory to match the nested array index
          const categoryIndex = selectedCategory;
          if (questionsData[categoryIndex]) {
            console.log("Fetched data:", questionsData[categoryIndex]);
            dispatch({
              type: "dataReceived",
              payload: questionsData[categoryIndex],
            });
          } else {
            throw new Error(`No data found for category ${selectedCategory}`);
          }
        } catch (err) {
          console.error("Fetching error:", err);
          dispatch({ type: "dataFailed" });
        }
      };

      fetchQuestions();
    }
  }, [selectedCategory]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        selectedCategory,
        categories,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider.");
  return context;
}

export { useQuiz, QuizProvider, QuizContext };
