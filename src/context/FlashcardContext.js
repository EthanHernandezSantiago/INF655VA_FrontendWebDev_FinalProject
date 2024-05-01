import { createContext, useContext, useState } from "react";
import {v4 as uuidv4 } from 'uuid';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import GroupContext from "./GroupContext";
import UserContext from "./UserContext";

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {

    // array of flashcard themselves
    let [flashcards, setFlashcards] = useState([]);
    // text on the front of card
    let [frontText, setFrontText] = useState('');
    // text on the back of the card
    let [backText, setBackText] = useState('');
    // number of the flashcard
    let [flashcardNumber, setFlashcardNumber] = useState(0);
    // edited text on the front
    let [editFront, setEditFront] = useState('');
    // edited text on the back
    let [editBack, setEditBack] = useState('');

    // groups is the area of groups made by the user
    const { groups, updateGroups } = useContext(GroupContext);
    // user is an object about the user
    const { user } = useContext(UserContext);

    // updates the flashcard when a user logs in, or creates, deletes, or edits a card
    // gId is group id, docId is the doccument id of the group, and isAdd is a bool to show if cards were added
    // or not
    async function updateFlashcards(gID, docId, isAdd) {
        // all the flashcards that belong in that group are gotten
        const q = query(collection(db, "flashcards"), where("groupId", "==", gID));
        const querySnapshot = await getDocs(q);
        // then the data is put into flashcards
        flashcards = querySnapshot.docs.map(doc => ({
            // document id (firebase's id)
            docId: doc.id,
            // id given in app
            id: doc.data().id,
            // id of group flashcard is in
            groupId: doc.data().groupId,
            // text on front
            front: doc.data().front,
            // text on the back
            back: doc.data().back
        }))
        // the second part is used to update the group database and array if cards are added
        // or deleted into it
        // numOfCards is set to how many cards that group has
        let numOfCards = groups.at(groups.findIndex(g => g.id === gID)).numOfCards
        // if isAdd is null, cards were not added or deleted, so the group db and array is not edited
        if (isAdd !== null) {
            // if isAdd == true, then one more is added to numOfCards
            if (isAdd) {
                numOfCards++;
            }
            // else, then a card was delted
            else {
                numOfCards--;
            }
            // the group is edited
            updateDoc(doc(db, "groups", docId), {
                "numOfCards": numOfCards
            })
            // the groups are updated
            updateGroups(user.username)
        }
        // the flashcards are set
        setFlashcards(flashcards)
    }

    // used to add a flashcard to the db and array
    // id is group id, and docId is the document id of the group
    function addFlashcard(id, docId) {
        // flashcard is added
        addDoc(collection(db, "flashcards"), {
            id: uuidv4(),
            groupId: id,
            front: frontText,
            back: backText
        })
        // flashcards are updated
        updateFlashcards(id, docId, true)
        // front and back are reset
        setFrontText('');
        setBackText('');
    }

    // used to delete a flashcard
    // gid is the group id, fDocId is the docuemnt id of the flashcard
    // gDocId is the group docuemnt id
    function deleteFlashcard(gid, fDocId, gDocId) {
        // flashcard is deleted
        deleteDoc(doc(db, "flashcards", fDocId))
        // flashcards are updated
        updateFlashcards(gid, gDocId, false)
    }

    // used to edit flashcard
    function editFlashcard() {
        // flashcard must be above zero and be a index of the flashcard array
        if (flashcardNumber <= 0) {
            alert("Error: Flashcard Number must be above 0")
            return;
        }
        if (flashcardNumber >= flashcards.length + 1) {
            alert("Error: Flashcard does not exist")
            return;
        }
        // id is the flashcards document id
        // gId is its group id
        let id = flashcards.at(--flashcardNumber).docId
        let gId = flashcards.at(--flashcardNumber).groupId
        // if the user left the form partly empty, only what was filled in is edited
        if (editBack === "") {
            updateDoc(doc(db, "flashcards", id), {
                "front": editFront,
            })
        }
        if (editFront === "") {
            updateDoc(doc(db, "flashcards", id), {
                "back": editBack
            })
        }
        if (editFront !== "" && editBack !== "") {
            updateDoc(doc(db, "flashcards", id), {
                "front": editFront,
                "back": editBack
            })
        }
        // flashcards are updated, and the varibles are reset
        updateFlashcards(gId, null, null)
        setFlashcardNumber(0)
        setEditFront('')
        setEditBack('');
    }

    // this is to hide and show certin parts on the FLASHCARD PAGE
    function toggleAddAndEdit() {
        // gets each element
        const add = document.getElementById("addFlashcard");
        const edit = document.getElementById("editFlashcard");
        // in tailwind if a element has a class with hidden it is not visible
        // so depending which one is visible, it either has it removed or added to
        if (add.classList.contains("hidden")) {
            edit.classList.add("hidden");
            add.classList.remove("hidden")
        }
        else {
            edit.classList.remove("hidden")
            add.classList.add("hidden")
        }
    }
    
    // used to get the id of the flashcard before
    // gid is the group id, and id is the id of the flashcard
    function getBefore(gid, id) {
        // temp get the flashcards in that group
        // i is set to the flashcard itself
        let temp = flashcards.filter(f => f.group === gid);
        let i = temp.findIndex(t => t.id === id);
        // if there is only 1 card, it get its own id
        if (temp.length === 1) {
            return temp[0].id;
        }
        // if there is more than one card, it checks where it is
        // if it is at the beginning, it gets the last id
        // else it gets the flashcard before it
        if (i === 0) {
            return temp[temp.length - 1].id
        }
        else {
            return temp[--i].id
        }
    } 

    // used to get the flashcard next to the current one
    // it is the same as getBefore just one line is different
    function getNext(gid, id) {
        let temp = flashcards.filter(f => f.group === gid);
        let i = temp.findIndex(t => t.id === id);
        if (temp.length === 1) {
            return temp[0].id;
        }
        if (i === temp.length - 1) {
            return temp[0].id
        }
        else {
            // the only difference is here it is ++i
            return temp[++i].id
        }

    }

    // used to "turn card" 
    // it works just like the toggleAndEdit function
    function turnCard(id) {
        const frontId = id + "f";
        const backId = id + 'b';
        const front = document.getElementById(frontId);
        const back = document.getElementById(backId);
        if (front.classList.contains("hidden")) {
          front.classList.remove("hidden");
          back.classList.add("hidden");
        }
        else {
          front.classList.add("hidden");
          back.classList.remove("hidden");
        }
    }

    return (
        <FlashcardContext.Provider value={{flashcards, frontText, backText, flashcardNumber, editFront, editBack, 
            setFlashcards, setFrontText, setBackText, setFlashcardNumber, setEditFront, setEditBack,
            updateFlashcards, addFlashcard, deleteFlashcard, editFlashcard, getBefore, getNext, turnCard, toggleAddAndEdit }}>
            {children}
        </FlashcardContext.Provider>
    )
}

export default FlashcardContext;