import React, { useContext } from 'react'
import Header from './Header'
import GroupContext from '../context/GroupContext'
import { useNavigate, useParams } from 'react-router-dom';
import FlashcardContext from '../context/FlashcardContext';
import FlashcardSummary from '../components/FlashcardSummary';

export default function GroupDashboard() {

  const { id } = useParams();
  const { groups , deleteGroup } = useContext(GroupContext);
  const { flashcards, frontText, backText, flashcardNumber, editFront, editBack,
    setFrontText, setBackText, setFlashcardNumber, setEditFront, setEditBack,
    addFlashcard, editFlashcard, toggleAddAndEdit } = useContext(FlashcardContext);
  let group = groups.at(groups.findIndex(g => g.id === id));
  let groupFlashcards = flashcards.filter(f => f.groupId === id);
  const navigator = useNavigate();
  const flashcardUrl = "/card/" + id;
  const quizUrl = "/quiz/" + id;

  return (
    <div>
      <Header text={"Group Dashboard"} />  
    <h2 className='text-4xl pl-5 pt-5 border-b-2 pb-2 border-black'>Group Name- {group.name}</h2>
    <div className='grid grid-cols-2 mt-5'>
        <section className='ml-2'>
          {flashcards.length === 0 ? <p className='text-center text-2xl border-2 border-red-600 bg-red-600 rounded-lg mt-9 p-5'>No Flashcards Created</p>
          :
          <table className='w-full text-center border-collapse border border-spacing-3'>
            <thead >
              <tr>
                <th className='border-2 border-black'>#</th>
                <th className='border-2 border-black'>Front</th>
                <th className='border-2 border-black'>Back</th>
                <th className='border-2 border-black'>Options</th>
              </tr>
            </thead>
             <tbody>
                {groupFlashcards.map((f, i)=> <FlashcardSummary key={f.id} i={i} flashcard={f} gDocId={group.docId}/>)}
              </tbody>
            </table>
            } 
          </section>
          <section className='ml-5'>
            <h2 className='border-b-2 border-black text-2xl text-center mb-3 mr-5'>Group Infromation</h2>
            <div className='pl-5'>
              <p>Group Id- {group.id}</p>
              <p>Group Creator- {group.creator}</p>
              <p>Number of Cards- {group.numOfCards}</p>
              {groupFlashcards.length !== 0 ?
              <button className="mt-3 mr-2 border-2 border-black p-1 rounded-md" onClick={() => {navigator(flashcardUrl); alert("Note: Click on flashcard to turn them over")}}>Look at Flashcards</button>
              : null }
              <button className="mt-3 border-2 border-black p-1 rounded-md" onClick={() => {deleteGroup(group.docId); navigator("/mainDashboard")}}>Delete Group</button>
            </div>
            <h2 className='border-b-2 border-black text-2xl text-center mb-3 mr-5'>Add and Edit Flashcards</h2>
            <div className='pl-5'>
              <section id="addFlashcard">
                <form onSubmit={(e) => {e.preventDefault(); addFlashcard(group.id, group.docId)} }>
                  <fieldset>
                    <legend>Enter Group Infromation</legend>
                    <label htmlFor="front">Font Text: </label>
                    <textarea required name="front" cols={70} rows={3} placeholder="Front" value={frontText} onChange={e => setFrontText(e.target.value)}/>
                    <br />
                    <label htmlFor="back">Back Text: </label>
                    <textarea required name="back"  cols={70} rows={3} placeholder="Back" value={backText} onChange={e => setBackText(e.target.value)}/>
                    <br />
                    <input type='submit' className="mt-3 border-2 border-black p-1 rounded-md" />
                  </fieldset>
                </form>
                <button className="mt-3 border-2 border-black p-1 rounded-md" onClick={toggleAddAndEdit}>Edit Flashcards</button>
              </section>
              <section id="editFlashcard" className='hidden'>
                <form onSubmit={e => {e.preventDefault(); editFlashcard();}}>
                  <fieldset>
                    <legend>Flashcard must exsist before editing</legend>
                    <label htmlFor='groupNumber'>Group Number: </label>
                    <input name="groupNumber" type="number" placeholder='0' value={flashcardNumber} onChange={e => setFlashcardNumber(e.target.value)} />
                    <br />
                    <label htmlFor="editFront">Edit Front Text: </label>
                    <textarea name="editFront" cols={70} rows={3} value={editFront} onChange={e => setEditFront(e.target.value)} placeholder="Leave empty to not change front"/>
                    <br />
                    <label htmlFor="editBack">Edit Back Text: </label>
                    <textarea name="editBack" cols={70} rows={3} value={editBack} onChange={e => setEditBack(e.target.value)} placeholder="Leave empty to not change back" />
                    <br />
                    <input type='submit' className="mt-3 border-2 border-black p-1 rounded-md" />
                  </fieldset>
                </form>
                <button className="mt-3 border-2 border-black p-1 rounded-md" onClick={toggleAddAndEdit}>Add Flashcards</button>
              </section>
            </div>
            <h2 className='border-b-2 border-black text-2xl text-center mb-3 mr-5'>Quiz Yourself</h2>
            <div className='pl-5'>
              <p className='pb-1'>Test your knowledge with information from the flashcards</p>
              {groupFlashcards.length !== 0 ?
                <button className="mt-1 border-2 border-black p-1 rounded-md" onClick={() => navigator(quizUrl)}>Multiple Choice Quiz</button>
                : <p>Create at least one flashcard to take a quiz</p>
              }
              </div>
          </section>
        </div>
      </div>
  )
}
