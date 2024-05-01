import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // user (init state is just a null to show no one is logged in)
    let [user, setUser] = useState({"username": "NOT_LOGGED_IN", "password": "NOT_LOGGED_IN"});
    // username used to log in
    let [username, setUsername] = useState('');
    // password used to log in
    let [password, setPassword] = useState('');
    // comfrim password used to check password when signing up
    let [comfimPassword, setComfimPassword] = useState('');

    // used to sign up
    function signUp() {
        return createUserWithEmailAndPassword(auth, username, password);
 
    }

    // used to log in
    function login() {
        return signInWithEmailAndPassword(auth, username, password);
    }

    // used to log out
    function logOut() {
        return signOut(auth);
    }

    return (
        <UserContext.Provider value= {{user, username, password, comfimPassword,
                setUser, setUsername, setPassword, setComfimPassword,
                login, signUp, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;