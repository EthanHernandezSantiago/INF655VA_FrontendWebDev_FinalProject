import React, { useContext } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import FlashcardContext from '../context/FlashcardContext'
import Flashcard from '../components/Flashcard';

export default function FlashcardPage() {

  const { flashcards, getBefore, getNext } = useContext(FlashcardContext)
  const { id } = useParams();
  let f = flashcards.at(flashcards.findIndex(f => f.id === id))
  let b = getBefore(f.group, f.id);
  let n = getNext(f.group, f.id);

  return (
    <div>
      <Header text={"Flashcards"} />
      <div className='flex mt-[3%] items-center justify-center'>
        <Flashcard f={f} next={n} before={b} />
      </div>
    </div>
  )
}
