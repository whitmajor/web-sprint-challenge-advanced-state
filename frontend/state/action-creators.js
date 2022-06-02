// ❗ You don't need to add extra action creators to achieve MVP
import * as  types from "./action-types"
import axios from "axios"


export function moveClockwise() {
  return {
    type: types.MOVE_CLOCKWISE,
    
  }
 }

export function moveCounterClockwise() {
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
 }

export function selectAnswer(id) { 
  return {
    type: types.SET_SELECTED_ANSWER,
    payload: id
  }
}


export function setMessage(data) { 
return{
  type: types.SET_INFO_MESSAGE,
  payload: data
}
}

export function setQuiz(data) { 
  return{
    type: types.SET_QUIZ_INTO_STATE,
    payload: data
  }
}

export function inputChange(id , value) {
  return{
    type: types.INPUT_CHANGE,
    payload: {id, value}
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
      dispatch(setQuiz(res.data))
    })

  }
}
export function postAnswer(id,answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const payload = {quiz_id: id, answer_id: answer}
    axios.post(`http://localhost:9000/api/quiz/answer`, payload)
    .then(res=>{
      console.log(res)
    dispatch(setMessage(res.data.message));
    dispatch(fetchQuiz());
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new',newQuiz)
    .then(res=> {
      console.log(res.data)
      dispatch({type: types.SET_QUIZ_INTO_STATE, payload: res.data})
      dispatch(setMessage(`Congrats: "${res.data.question}?" is a great question!`))
      dispatch(resetForm())
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
