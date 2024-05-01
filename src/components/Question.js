import React, { useContext } from 'react'
import QuizesContext from '../context/QuizesContext'

// used to display questions on QUIZ PAGE
export default function Question({ question, options, i  }) {
  // question is the question itself, options is 2d array of the possible answers
  // and i is index

  // op is the array inside the options array that are the options of that question
  let op = options[i]
  const { updateAnswer } = useContext(QuizesContext);

  return (
    <div className='m-7 text-2xl'>
        <p>Question {++i} - {question}</p>
        <div className='ml-3'>
        <form>
            <fieldset>
                {op.map(o => 
                    <div>
                        <input name="opt" type="radio" value={o} onChange={(e) => {e.stopPropagation(); updateAnswer(i, o)}} />
                        <label htmlFor='opt' > {o}</label>
                    </div>
                )}
            </fieldset>
        </form>
        </div>    
    </div>
  )
}
