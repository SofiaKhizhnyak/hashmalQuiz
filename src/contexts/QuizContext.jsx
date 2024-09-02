import { createContext, useContext, useReducer, useEffect } from "react";
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
  canChangeAnswer: false,
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
      const alreadyAnswered = question.userAnswer !== undefined;
      return {
        ...state,
        questions: state.questions.map((q, idx) =>
          idx === state.index ? { ...q, userAnswer: action.payload } : q
        ),
        answer: action.payload,
        points:
          !alreadyAnswered && action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        /* canChangeAnswer: false, */
      };
    case "nextQuestion":
      const nextIndex = state.index + 1;
      return {
        ...state,
        index: nextIndex,
        answer: state.questions[nextIndex]?.userAnswer ?? null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "previousQuestion":
      const prevIndex = state.index - 1;
      return {
        ...state,
        index: prevIndex > 0 ? prevIndex : 0,
        answer: state.questions[prevIndex]?.userAnswer ?? null, // Set the answer to the user's previous answer
      };

    /* case "allowChangeAnswer":
      return {
        ...state,
         canChangeAnswer: true,  // Enable changing the answer when requested
      }; */
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
      canChangeAnswer,
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
        canChangeAnswer,
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
