import React ,{useEffect}from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)

  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props.form)
    const question = props.form.newQuestion;
    const trueAnswer =props.form.newTrueAnswer;
    const falseAnswer = props.form.newFalseAnswer;
    //props.postQuiz(props.form)
    props.postQuiz({question_text: question, true_answer_text: trueAnswer, false_answer_text: falseAnswer})

  }

  const onChange = evt => {
    const {id,value} = evt.target;
    props.onChange(id,value)
    
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
    <form id="form"onSubmit={onSubmit} >
      <h2>Create New Quiz</h2>
      <input maxLength={50} 
       value = {props.form.newQuestion}
      onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50}
       name={props.form.newTrueAnswer}
       value={props.form.newTrueAnswer}
       onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50}
       name={props.form.newFalseAnswer}
       value={props.form.newFalseAnswer}
        onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn"  disabled={isDisabled} >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
