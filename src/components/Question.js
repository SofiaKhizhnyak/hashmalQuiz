import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();

  let question = questions.at(index);
  return (
    <div className="to-right">
      <h4 className="q">{question.question}</h4>
      <Options question={question} key={crypto.randomUUID()} />
    </div>
  );
}

export default Question;
