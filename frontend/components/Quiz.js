import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Quiz(props) {
  const { fetchQuiz, selectAnswer, postAnswer, quiz, selectedAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, []);

  const onClick = (id) => {
    selectAnswer(id);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer,
    });
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            <div
              className={`${
                selectedAnswer === quiz.answers[0].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[0].text}
              <button onClick={() => onClick(quiz.answers[0].answer_id)}>
                {selectedAnswer === quiz.answers[0].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>

            <div
              className={`${
                selectedAnswer === quiz.answers[1].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[1].text}
              <button onClick={() => onClick(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            id="submitAnswerBtn"
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

export default connect((state) => state, actionCreators)(Quiz);
