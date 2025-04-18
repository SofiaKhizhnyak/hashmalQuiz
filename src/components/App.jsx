import React from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen-v2";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Nav from "./Nav";
import { useQuiz } from "../contexts/QuizContext";
import Footer from "./Footer";
import GoHomeButton from "./GoHomeButton";
import LogoutButton from "./LogoutButton";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <div style={{ display: "flex" }}>
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            opacity: 0.7,
            justifyContent: "center",
          }}
        >
          <GoHomeButton />
          <LogoutButton />
        </div>
      </div>
      <Main>
        {status === "loading" && <Loader />}
        {status === "dataFailed" && <Error />}
        {status === "categoriesReady" && <StartScreen />}
        {status === "ready" && (
          <>
            <Progress />
            <Question />
            <Nav />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
      <Footer />
    </div>
  );
}
