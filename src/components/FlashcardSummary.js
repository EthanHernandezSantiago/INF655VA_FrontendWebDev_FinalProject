import React, { useContext } from 'react'
import FlashcardContext from '../context/FlashcardContext';
import { SlTrash } from "react-icons/sl";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

// Displays summary of card for table in GROUP DASHBOARD 
export default function FlashcardSummary({ flashcard, i, gDocId }) {
  // flashcard is flashcard object, i is index, gDocId is the doc id of the 
  // group that the card belongs to

  const { deleteFlashcard } = useContext(FlashcardContext);
  // used to navaigate to other page
  const naviagor = useNavigate();
  // url to the look at the card itself
  const url = '/card/' + flashcard.id;

  return (
    <tr>
        <td className='border-2 border-black'>{++i}</td>
        <td className='border-2 border-black'>{flashcard.front}</td>
        <td className='border-2 border-black'>{flashcard.back}</td>
        <td className='border-2 border-black'>
          <button className="border-2 border-black p-1 rounded-md" onClick={e => {e.stopPropagation(); deleteFlashcard(flashcard.groupId, flashcard.docId, gDocId)}}><SlTrash /></button>
          <button className="border-2 border-black p-1 rounded-md" onClick={e => {e.stopPropagation(); naviagor(url)}}><FaMagnifyingGlass /></button>
        </td>
    </tr>
  )
}
