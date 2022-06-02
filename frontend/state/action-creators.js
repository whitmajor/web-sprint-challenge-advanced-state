// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  RESET_FORM,
} from "./action-types";

export function moveClockwise(newSpace) {
  return { type: MOVE_CLOCKWISE, payload: newSpace };
}

export function moveCounterClockwise(newSpace) {
  return { type: MOVE_COUNTERCLOCKWISE, payload: newSpace };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(newData) {
  return { type: SET_QUIZ_INTO_STATE, payload: newData };
}

export function inputChange(change) {
  return { type: INPUT_CHANGE, payload: change };
}

export function resetForm() {
  return { type: RESET_FORM };
}

export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get(`http://localhost:9000/api/quiz/next`)
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      // .catch((err) => {
        // debugger;
      // });
  };
}
export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/answer`, { quiz_id, answer_id })
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setQuiz(null));
        dispatch(fetchQuiz());
        dispatch(setMessage(res.data.message));
      })
      // .catch((err) => {
        // debugger;
      // });
  };
}
export function postQuiz({
  question_text,
  true_answer_text,
  false_answer_text,
}) {
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/new`, {
        question_text,
        true_answer_text,
        false_answer_text,
      })
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      // .catch((err) => {
        // debugger;
      // });
  };
}