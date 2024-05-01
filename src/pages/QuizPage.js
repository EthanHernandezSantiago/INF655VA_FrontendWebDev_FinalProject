import React, { useContext } from 'react'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'
import QuizesContext from '../context/QuizesContext';
import Question from '../components/Question';

export default function QuizPage() {

  const { id } = useParams();
  const { questions , options, setUp, checkAnswers } = useContext(QuizesContext);
  const navgatior = useNavigate();
  const reviewUrl = "/quizReview/" + id

  return (
    <div>
      <Header text={"Quiz"} />
      <div id="quizInfo" className='m-5'>
        <h2 className='text-4xl border-b-2 border-black mb-3'>Quiz Instructions</h2>
        <div className='text-2xl ml-2 mr-4'>
          <p>You will be tested on your knowledge of the flashcards you have created. The quiz will be multiple choice, with each quesiton will have four options. Only one options
            will be right. The other 3 will be the random answers to the other questions. Note: if there are less then 4 flashcards some options may be repeated.
          </p>
          <p className='mt-3'>Click below to start the quiz.</p>
        </div>
        <button className="border-2 border-black p-1 rounded-md ml-2 mt-3" onClick={e => {e.stopPropagation(); setUp(id)}}>Start Quiz</button>
      </div>
      <div id="quiz" className='hidden'>
        {questions.map((q, i) => <Question key={i} question={q.front} options={options} i={i} />)}
        <buton className="border-2 border-black p-1 rounded-md ml-7 text-2xl" onClick={e => {e.stopPropagation(); checkAnswers(); navgatior(reviewUrl)}}>Done</buton>
      </div>
    </div>
  )
}
