import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowSmLeft } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import FlashcardContext from '../context/FlashcardContext';

// Flashcard is used to display the actucal flashcard
export default function Flashcard({ f, next, before }) {
  // f is the flashcard object, next and before are links to the flashcard next and before current

  // used to naviagate to other page 
  const naviagor = useNavigate();
  // url to the card before and next
  const beforeUrl = "/card/" + before;
  const nextUrl = "/card/" + next;
  // custom id for the two sides of the flashcard
  // used to edit css so the card "turns"
  const frontId = f.id + "f";
  const backId = f.id + "b";
  // function to make it appear card has turned
  const { turnCard } = useContext(FlashcardContext);

  return (
    <div onClick={() => turnCard(f.id)} id="card" className='h-[80vh] w-[160vh] border-2 border-black'>
      <section id ={frontId} className='flex mt-[22%] justify-between item-center'>
        <button className="border-2 border-black p-1 rounded-md text-4xl"  onClick={(e) => {e.stopPropagation(); naviagor(beforeUrl)}}><HiArrowSmLeft /></button>
        <p className='text-4xl'>{f.front}</p>
        <button className="border-2 border-black p-1 rounded-md text-4xl" onClick={(e) => {e.stopPropagation(); naviagor(nextUrl)}}><HiArrowSmRight /></button>
      </section>
      <section id ={backId} className='flex mt-[22%] justify-between item-center hidden'>
        <button className="border-2 border-black p-1 rounded-md text-4xl" onClick={(e) => {e.stopPropagation(); naviagor(beforeUrl)}}><HiArrowSmLeft /></button>
        <p className='text-4xl'>{f.back}</p>
        <button className="border-2 border-black p-1 rounded-md text-4xl" onClick={(e) => {e.stopPropagation(); naviagor(nextUrl)}}><HiArrowSmRight /></button>
      </section>
    </div>
  )
}
