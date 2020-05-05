import React, { useContext } from "react";
import QuizContext from "../../Context/QuizeContext";
const Quiz = () => {
  const quizContext = useContext(QuizContext);
  const { quizs } = quizContext;
  return (
    <React.Fragment>
      {quizs.map((quiz) => (
        <h3>{quiz.answer}</h3>
      ))}
    </React.Fragment>
  );
};

export default Quiz;
