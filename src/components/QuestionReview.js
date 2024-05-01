import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { VscClose } from "react-icons/vsc";

// used to display review of the question answers in QUIZ REVIEW PAGE
export default function QuestionReview({ i, quesiton, answer, userAnswer }) {
  // i is index, question is the questio itself, answer is the questions answer
  // and userAnswer is the answer the user selected
  
  return (
    <tr>
        <td className='border-2 border-black'>{++i}</td>
        <td className='border-2 border-black'>{quesiton}</td>
        <td className='border-2 border-black'>{answer}</td>
        <td className='border-2 border-black'>{userAnswer}</td>
        {answer === userAnswer ? <td className='border-2 border-black bg-lime-400'><div className="flex justify-center"><FaCheck /></div></td>
        : <td className='border-2 border-black bg-red-400'><div className='flex justify-center'><VscClose /></div></td>}
    </tr>
  )
}