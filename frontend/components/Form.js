import React ,{useEffect}from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)

  const onSubmit = evt => {
    evt.PreventDefault();
    props.postQuiz({question_text: props.form.newQuestion, true_answer_text: props.form.trueAnswer, false_answer_text: props.form.falseAnswer})

  }

  const onChange = evt => {
    const {id,value} = evt.target;
    props.inputChange(id,value);
    
  }
  
  const isDisabled = ()=>{
    const button = document.getElementById("submitNewQuizBtn");
    const trimQuestion = props.form.newQuestion.trim(' ');
    const trimmedAnswer = props.form.newTrueAnswer.trim(' ');
    const trimmedFalseAnswer = props.form.newFalseAnswer.trim(' ');

    if (trimQuestion.length > 0 && trimmedAnswer.length > 0 && trimmedFalseAnswer.length >0){
      return button.disabled = false;

    }else{
      return button.disabled = true
    }
  }
  useEffect(()=>{
    isDisabled();
  },[props.form])

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} 
       value = {props.newQuestion}
      onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50}
       name={props.newTrueAnswer}
       value={props.newTrueAnswer}
       onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50}
       name={props.newFalseAnswer}
       value={props.newFalseAnswer}
        onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled} >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
