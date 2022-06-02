import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

const Quiz = (props) => {
  //console.log(props)


  const quiz = props.quiz;
  const [selectedAnswer,setSelectedAnswer] = useState("");

  const selectAnswer = (evt)=>{
    const id = evt.target.id;
    props.selectAnswer(id);
    setSelectedAnswer(id);  }
  

  const handleSubmit = () => {
    const answer = (props.selectedAnswer)
    const id = (quiz.quiz_id);
    props.postAnswer(id, answer);
  }
  

  useEffect(() => {
    props.quiz?null:props.fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
        
                <div className={selectedAnswer === quiz.answers[0].answer_id ? 'answer selected' : "answer"}>
                  {quiz.answers[0].text}

                  <button id= {quiz.answers[0].answer_id} onClick = {selectAnswer}>
                    {selectedAnswer=== quiz.answers[0].answer_id ? 'SELECTED' : "Select"}
                  </button>
                </div>

                <div className={selectedAnswer === quiz.answers[1].answer_id ? 'answer selected': "answer"}>
                    {quiz.answers[1].text}
                <button id ={quiz.answers[1].answer_id} onClick = {selectAnswer}>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED': "Select"}
                </button>
            
              </div>
            </div>
            <button id="submitAnswerBtn" disabled ={!selectedAnswer} onClick={handleSubmit}> Submit answer </button>
          </>
    
         ) : "Loading next quiz..."
      }
    </div>
  )
}
export default connect(st => st, actionCreators)(Quiz);