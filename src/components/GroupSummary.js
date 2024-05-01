import React, { useContext } from 'react'
import GroupContext from '../context/GroupContext'
import { useNavigate } from 'react-router-dom';
import { SlTrash } from "react-icons/sl";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FlashcardContext from '../context/FlashcardContext';

// used to display summary of group in table in MAIN DASHBOARD
export default function GroupSummary({ group, i }) {
    // group is the group object and i is index

    const { deleteGroup } = useContext(GroupContext);
    const { updateFlashcards } = useContext(FlashcardContext);
    const naviagor = useNavigate();
    // used to go to the group itself
    const url = '/group/' + group.id;
    
    return (
        <tr>
            <td className='border-2 border-black'>{++i}</td>
            <td className='border-2 border-black'>{group.name}</td>
            <td className='border-2 border-black'>{group.creator}</td>
            <td className='border-2 border-black'>{group.numOfCards}</td>
            <td className='border-2 border-black'>
                <button className="border-2 border-black p-1 rounded-md" onClick={e => {e.stopPropagation(); deleteGroup(group.docId)}}><SlTrash /></button>
                <button className="border-2 border-black p-1 rounded-md" onClick={e => {e.stopPropagation(); updateFlashcards(group.id, group.docId, null); naviagor(url)}}><FaMagnifyingGlass /></button>
            </td>
        </tr>
  )
}
