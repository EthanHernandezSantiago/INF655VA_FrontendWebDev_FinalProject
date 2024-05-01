import React, { useContext } from 'react'
import Header from './Header'
import GroupContext from '../context/GroupContext'
import GroupSummary from '../components/GroupSummary';
import UserContext from '../context/UserContext';

export default function MainDashboard() {

  const { groups, groupName, groupNewName, groupNumber, setGroupName, setGroupNewName, setGroupNumber, addGroup, editGroup} = useContext(GroupContext);
  const { user } = useContext(UserContext);

  return (
    <div>
        <Header text={"Main Dashboard"}/>
      <br />
        <div className='grid grid-cols-2'>
          <section className='ml-2'>
            {groups.length === 0 ? <p className='text-center text-2xl border-2 border-red-600 bg-red-600 rounded-lg mt-9 p-5'>No Groups Created</p>
            :
            <table className='w-full text-center border-collapse border border-spacing-3'>
              <thead >
                <tr>
                  <th className='border-2 border-black'>#</th>
                  <th className='border-2 border-black'>Group Name</th>
                  <th className='border-2 border-black'>Creater</th>
                  <th className='border-2 border-black'>Amount of Cards</th>
                  <th className='border-2 border-black'>Options</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, i) => <GroupSummary group={g} key={g.id} i={i} />)}
              </tbody>
            </table>
            } 
          </section>
          <section className='ml-5'>
            <h2 className='border-b-2 border-black text-2xl text-center mb-5 mr-5'>Create New Group</h2>
            <form onSubmit={e => {e.preventDefault(); addGroup(user.username)}}>
              <fieldset>
                <legend>Enter Group Infromation</legend>
                <label htmlFor="gname">Group Name: </label>
                <input required name="gname" type="text" placeholder="Name" value={groupName} onChange={e => setGroupName(e.target.value)} />
                <br />
                <input type='submit' className="mt-3 border-2 border-black p-1 rounded-md" />
              </fieldset>
            </form>
            <h2 className='border-b-2 border-black text-2xl text-center mt-5 mb-5 mr-5'>Edit Group Name</h2>
            <form onSubmit={e => {e.preventDefault(); editGroup()}}>
              <fieldset>
                <legend>Group must exsist before editing</legend>
                <label htmlFor='groupNumber'>Group Number: </label>
                <input name="groupNumber" type="number" placeholder='0' value={groupNumber} onChange={e => setGroupNumber(e.target.value)} />
                <br />
                <label htmlFor='newName'>New Name: </label>
                <input name="newName" type="text" placeholder='New Name' value={groupNewName} onChange={e => setGroupNewName(e.target.value)} />
                <br />
                <input type='submit' className="mt-3 border-2 border-black p-1 rounded-md" />
              </fieldset>
            </form>
          </section>
        </div>
      </div>
  )
}
