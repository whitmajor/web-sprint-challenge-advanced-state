// ❗ You don't need to add extra action creators to achieve MVP
import * as  types from "./action-types"
import axios from "axios"


export function moveClockwise() {
  return {
    types: types.MOVE_CLOCKWISE,
    
  }
 }

export function moveCounterClockwise() {
  return {
    types: types.MOVE_COUNTERCLOCKWISE
  }
 }

export function selectAnswer(answer) { 
  return {
    types: types.SET_SELECTED_ANSWER,
    payload: answer
  }
}


export function setMessage(message) { 
return{
  types: types.SET_INFO_MESSAGE,
  payload: message
}
}

export function setQuiz(question) { 
  return{
    types: types.SET_QUIZ_INTO_STATE,
    payload: question
  }
}

export function inputChange({question , answer}) {
  return{
    type: types.INPUT_CHANGE,
    payload: {question, answer}
  }

 }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
    .then(res=> {
      console.log(res)
      dispatch(setQuiz(res.data))
    })
.catch(err =>{
  console.log(err)
  
})
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
