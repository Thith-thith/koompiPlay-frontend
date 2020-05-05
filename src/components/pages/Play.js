import React from "react";
import { Helmet } from "react-helmet";
import { RiCoinsLine } from "react-icons/ri";
import { MdAlarm ,MdLiveHelp } from "react-icons/md";
import M from 'materialize-css';




import questions from "../data/questions.json";
import isEmpty from '../../utilis/is-empty';


const TITLE = "Quiz App | Play";

class Play extends React.Component {
  
constructor (props) {
  super(props);
  this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 2,
      previousRandomNumbers: [],
      time: {}
  };
  this.interval = null;
}

componentDidMount () {
  const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
  this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
  this.startTimer();
}

componentWillUnmount () {
  clearInterval(this.interval);
}

displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
  let { currentQuestionIndex } = this.state;   
  if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: []
      }, () => {
          this.showOptions();
      });
  }     
};

handleOptionClick = (e) => {
  if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctTimeout = setTimeout(() => {
      }, 500);
      this.correctAnswer();
  } else {
      this.wrongTimeout = setTimeout(() => {
      }, 500);
      this.wrongAnswer();
  }
}


handleQuitButtonClick = () => {
  if (window.confirm('Are you sure you want to quit?')) {
      this.props.history.push('/');
  }
};

handleButtonClick = (e) => {
  switch (e.target.id) {
      case 'quit-button':
          this.handleQuitButtonClick();
          break;

      default:
          break;
  }
};



correctAnswer = () => {
  M.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
  });
  this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
  }), () => {            
      if (this.state.nextQuestion === undefined) {
          this.endGame();
      } else {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      }
  });
}

wrongAnswer = () => {
  navigator.vibrate(1000);
  M.toast({
      html: 'Wrong Answer!',
      classes: 'toast-invalid',
  });
  this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
  }), () => {
      if (this.state.nextQuestion === undefined) {
          this.endGame();
      } else {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      }
  });
}

showOptions = () => {
  const options = Array.from(document.querySelectorAll('.option'));

  options.forEach(option => {
      option.style.visibility = 'visible';
  });

}

handleHints = () => {
  console.log('hello');
  
  if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;

      options.forEach((option, index) => {
          if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
              indexOfAnswer = index;
          }
      });

      while (true) {
          const randomNumber = Math.round(Math.random() * 3);
          if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
              options.forEach((option, index) => {
                  if (index === randomNumber) {
                      option.style.visibility = 'hidden';
                      this.setState((prevState) => ({
                          hints: prevState.hints - 1,
                          previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                      }));
                  }
              });
              break;
          }
          if (this.state.previousRandomNumbers.length >= 3) break;
      }
  }
}



startTimer = () => {
  const countDownTime = Date.now() + 600600;
  this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
          clearInterval(this.interval);
          this.setState({
              time: {
                  minutes: 0,
                  seconds: 0
              }
          }, () => {
              this.endGame();
          });
      } else {
          this.setState({
              time: {
                  minutes,
                  seconds,
                  distance
              }
          });
      }
  }, 1000);
}



endGame = () => {
  alert('Quiz has eneded!');
  const { state } = this;
  const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      hintsUsed: 2 - state.hints
  };
  setTimeout(() => {
      this.props.history.push('/result', playerStats); 
  }, 1000);
}


  render() {

    const { 
      currentQuestion, 
      currentQuestionIndex,        
      hints, 
      numberOfQuestions,
      time 
  } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h2 className="header mt-12 text-center">Quiz Time</h2>
        <form className=" bg-gray-200 container shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-12 h-full">
          <div className="lifeline fill-current text-xl p-8 flex justify-between">
            <div className="text-teal-600">
              <RiCoinsLine />{currentQuestionIndex + 1} of {numberOfQuestions}
            </div>
            <div className="text-red-600">
              <MdAlarm /> {time.minutes}:{time.seconds}
            </div>
            <div onClick={this.handleHints} className="text-blue-600">
              <MdLiveHelp />{hints}
            </div>
          </div>
          <div className="max-w-4xl mx-auto flex p-8 bg-white rounded-lg shadow-xl h-auto text-2xl">
            <h5>{currentQuestion.question}</h5>
          </div>

            <div className="question container text-xl flex-auto">
              <button  type="button" onClick={this.handleOptionClick} className=" option bg-teal-400 w-2/4 text-white font-bold py-3 px-4 rounded-full my-12 ">
                {currentQuestion.optionA}
              </button>
              <button type="button" onClick={this.handleOptionClick} className=" option bg-teal-400 w-2/4 text-white font-bold py-3 px-4 rounded-full">
                {currentQuestion.optionB}
              </button>

              <button type="button" onClick={this.handleOptionClick} className="option bg-teal-400 w-2/4 text-white font-bold py-3 px-4 rounded-full">
                {currentQuestion.optionC}
              </button>
              <button type="button" onClick={this.handleOptionClick} className="option bg-teal-400 w-2/4 text-white font-bold py-3 px-4 rounded-full">
                {currentQuestion.optionD}
              </button>
            </div>
          <div className="justify-around p-20 mr-100px">
            <button type="button" id="quit-button" onClick={this.handleButtonClick} className=" w-32 bg-red-600 hover:bg-red-700 text-gray-800 font-bold py-2 px-4 rounded">
              Quit {"x"}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Play;
