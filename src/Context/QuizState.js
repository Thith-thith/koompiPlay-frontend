import React, { useReducer } from "react";
import uuid from "uuid";
import QuizContext from "./QuizeContext";
import quizReducer from "./QuizeReducer";

import {
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  SET_ANSWERS,
  RESET_QUIZ,
} from "../components/type";

const QuizState = (props) => {
  const initialState = {
    quizs: [
      {
        id: 1,
        quistion: "what is your job?",
        answer: "my job is student",
      },
      {
        id: 2,
        quistion: "what is your name?",
        answer: "my name is Den",
      },
      {
        id: 3,
        quistion: "how old are you?",
        answer: "i am 20 years old",
      },
      {
        id: 4,
        quistion: "how many member in your family?",
        answer: "In my family have 3 members",
      },
      {
        id: 5,
        quistion: "what grade do you study?",
        answer: "I study grade 12A",
      },
    ],
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);

  //

  return (
    <QuizContext.Provider
      value={{
        quizs: state.quizs,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};
export default QuizState;
