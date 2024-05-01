import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import {v4 as uuidv4 } from 'uuid';
import { addDoc } from 'firebase/firestore'
import { db } from "../firebase";
import UserContext from "./UserContext";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    
    // groups is the groups the user has
    let [groups, setGroups] = useState([]);
    // name of the group to be added
    let [groupName, setGroupName] = useState('');
    // the new name for a group when it is edited
    let [groupNewName, setGroupNewName] = useState('');
    // number of group
    let [groupNumber, setGroupNumber] = useState(0);

    // user has info about user
    const { user } = useContext(UserContext);

    // used to update groups after array is edited
    // username is username of user
    async function updateGroups(username) {
        // gets all groups created by the user
        const q = query(collection(db, "groups"), where("creator", "==", username));
        const querySnapshot = await getDocs(q);
        // each group has the following fields
        groups = querySnapshot.docs.map(doc => ({
            // docuemnt id (firebase id)
            docId: doc.id,
            // id given in app
            id: doc.data().id,
            // name of group
            name: doc.data().name,
            // creator of group
            creator: doc.data().creator,
            // num of cards in it
            numOfCards: doc.data().numOfCards
        }))
        // groups is set up
        setGroups(groups)
    }

    // used to add a group
    // creator is the name of the creator
    async function addGroup(creator) {
        console.log(creator)
        // group is added
        addDoc(collection(db, "groups"), {
            id: uuidv4(),
            name: groupName,
            creator: creator,
            numOfCards: 0            
        })
        // groups is updated
        updateGroups(creator)
        // name is reset
        setGroupName('');
    }

    // used to delete a group
    // id is the docuemnt id of the group
    async function deleteGroup(id) {
        // group deleted, and groups updated
        deleteDoc(doc(db, "groups", id))
        updateGroups(user.username)
    }

    // used to edit a group
    async function editGroup() {
        // group number must be above 0 and a valid index in array
        if (groupNumber <= 0) {
            alert("Error: Group Number must be above 0")
        }
        if (groupNumber >= groups.length + 1) {
            alert("Error: Group does not exist")
        }
        // id is the document id of the group
        let id = groups.at(--groupNumber).docId
        // name and group are updated
        updateDoc(doc(db, "groups", id), {
            "name": groupNewName
        })
        updateGroups(user.username)
    }

    return (
        <GroupContext.Provider value={{groups, groupName, groupNewName, groupNumber,
            setGroupName, setGroupNewName, setGroupNumber,
            addGroup, deleteGroup, updateGroups, editGroup}}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupContext;