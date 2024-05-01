import React, { useContext } from 'react'
import Header from './Header'
import QuizesContext from '../context/QuizesContext'
import QuestionReview from '../components/QuestionReview';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizReviewPage() {

  const { id } = useParams();
  const { questions, answers, userAnswers, score, reset } = useContext(QuizesContext);
  const navigator = useNavigate();
  const url = "/group/" + id;

  return (
    <div>
        <Header text={"Quiz Review"} />
        <div className='w-11/12 m-auto mt-5'>
            <table className='w-full text-center border-collapse border border-spacing-3'>
                <thead>
                    <tr>
                        <th className='border-2 border-black'>Question #</th>
                        <th className='border-2 border-black'>Question</th>
                        <th className='border-2 border-black'>Answer</th>
                        <th className='border-2 border-black'>User Answer</th>
                        <th className='border-2 border-black'>Got Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, i) => <QuestionReview key={i} i={i} quesiton={questions[i].front} answer={answers[i]} userAnswer={userAnswers[i]} />)}
                    <tr>
                        <td className='border-2 border-black' colSpan={4}>Score</td>
                        <td className='border-2 border-black'>{score}%</td>
                    </tr>
                </tbody>
            </table>
        <button className="mt-5 border-2 border-black p-1 rounded-md text-2xl" onClick={e => {e.stopPropagation(); reset(); navigator(url)}}>Return</button>
        </div>
    </div>
  )
}