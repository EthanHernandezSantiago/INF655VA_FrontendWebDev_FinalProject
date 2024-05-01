import { createContext, useContext, useState } from "react";
import FlashcardContext from "./FlashcardContext";

const QuizesContext = createContext();

export const QuizesProvider = ({ children }) => {
    
    // questions to be asked (front of flashcards)
    let [questions, setQuestions] = useState([]);
    // questions without the current answer (see use later)
    let [filteredQuestions, setFilteredQuestions] = useState([]);
    // answers to quesitons (back of flashcards)
    let [answers, setAnswers] = useState([]);
    // the answers the user selects
    let [userAnswers, setUserAnswers] = useState([]);
    // the multiplce choice options to each question
    let [options, setOptions] = useState([]);
    // score user gets
    let [score, setScore] = useState(0);

    // flashcards array that has all the flashcards
    const { flashcards } = useContext(FlashcardContext);

    // NOTE: each question will have a max of 4 options
    // and each option will either be the answer or 
    // answers to the other questions


    // this set up the questions array
    // gid is the id of the group the flashcards are in
    function createQuestions(gid) {
        // cards is all the cards in that group
        let cards = flashcards.filter(f => f.groupId === gid)
        // the cards are sorted randomly
        questions = cards.sort(() => Math.random() - 0.5)
        // questions are set up
        setQuestions(questions)
    }

    // this is used to set up the answers array
    function seperateAnswers() {
        // the answers to each question
        questions.forEach(q => {
            answers.push(q.back);
            setAnswers([...answers]);
        });
    }

    // this sets up the options array
    // answer the answer to that current question
    function setUpOptions(answer) {
        //ranNum is a random number
        let ranNum;
        // a sub array to be added in the 2d array options
        let subArr = []
        // length of the sub array (since number of question vary)
        let subArrLen;
        // filterQuetions is set to the questions array without the question being asked
        filteredQuestions = questions.filter(q => q.back !== answer);
        setFilteredQuestions(filteredQuestions);
        // each question has a maxium of 4 options
        // if less than 4 questions then ranNum is a random number between 0 and the # od questions
        // the length of the subarray is set to the amount of questions
        if (questions.length < 4) {
            ranNum = Math.floor(Math.random() * questions.length);
            subArrLen = questions.length; 
        }
        // eles ranNum is 0 - 4 and the length of the subarr is 4
        else {
            ranNum = Math.floor(Math.random() * 4);
            subArrLen = 4;
        }
        // then each option is added
        for(let i = 0; i < subArrLen; i++) {
            // answer is put in a random spot
            if (i === ranNum) {
                subArr.push(answer);
            }
            // the rest of the options are randomly selected form the rest
            else {
                // filerted questions is shuffled many time to make it random
                filteredQuestions.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5);
                // the last element is added to the options
                subArr.push(filteredQuestions.shift().back)
                // the array is shuffled more
                filteredQuestions.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5);
                setFilteredQuestions(filteredQuestions)
            }
        }
        // the subArr is added to options and filteredQuesitons is reset
        options.push(subArr);
        setOptions([...options]);
        setFilteredQuestions([]);
    }

    // used to update the answer is the user changes their answer
    function updateAnswer(i, ans) {
        // if user has not chosen the answer is added
        if (userAnswers.length < i) {
            userAnswers[i] = ans;
            setUserAnswers([...userAnswers])
        }
        // else if user chooses a new answer, it is changed
        else {
            if (userAnswers[i] !== ans) {
            userAnswers[i] = ans
            setUserAnswers([...userAnswers]);
            }
        }
    }

    // used to check the answers
    function checkAnswers() {
        // num of corrent and wrong
        let correct = 0;
        let wrong = 0;
        // the last answer is removed since there is null answer in it
        userAnswers.shift();
        setUserAnswers(userAnswers);
        // checks to see if user answer matches real answer
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] === answers[i]) {
                correct++;
            }
            else {
                wrong++;
            }
        }
        // if the user doesn't answer some of the question, they are counted as wrong
        if (correct + wrong !== questions.length) {
            wrong = questions.length - correct;
        }
        // a percentage of what they got right is gotten
        score = ((correct) / (questions.length)) * 100
        setScore(score)
    }

    // used to set up the quiz
    // gid is the group id
    function setUp(gid) {
        const quizInfo = document.getElementById("quizInfo")
        const quiz = document.getElementById("quiz")
        createQuestions(gid);
        seperateAnswers();
        answers.forEach(a => setUpOptions(a));
        // the instructions are hidden and the quiz is shown
        quizInfo.classList.add("hidden")
        quiz.classList.remove("hidden")
    }

    // used to reset all the varibles after the quiz
    function reset() {
        questions = []
        setQuestions(questions)
        filteredQuestions = []
        setFilteredQuestions(filteredQuestions)
        answers = []
        setAnswers(answers)
        userAnswers = []
        setUserAnswers(userAnswers)
        options = []
        setOptions(options)
        setScore(0)
    }


    return (
        <QuizesContext.Provider value ={{questions, answers, userAnswers, options, score,
            setUp, updateAnswer, checkAnswers, reset }}>
            {children}
        </QuizesContext.Provider>
    )
}

export default QuizesContext;