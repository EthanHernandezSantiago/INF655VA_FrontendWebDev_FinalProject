import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import GroupDashboard from "./pages/GroupDashboard";
import FlashcardPage from "./pages/FlashcardPage";
import QuizPage from "./pages/QuizPage";
import { UserProvider } from "./context/UserContext";
import { GroupProvider } from "./context/GroupContext";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { FlashcardProvider } from "./context/FlashcardContext";
import NotFoundPage from "./pages/NotFoundPage";
import { QuizesProvider } from "./context/QuizesContext";
import QuizReviewPage from "./pages/QuizReviewPage";

function App() {
  return (
    <UserProvider>
      <GroupProvider>
        <FlashcardProvider>
          <QuizesProvider>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage/>} />
                  <Route path="/mainDashboard" element={<MainDashboard />} />
                  <Route path="/group/:id" element={<GroupDashboard />} />
                  <Route path="/card/:id" element={<FlashcardPage />} />
                  <Route path="/quiz/:id" element={<QuizPage />} />
                  <Route path="/quizReview/:id" element={<QuizReviewPage />} />
                  <Route path="/signUp" element={<SignUpPage />} />
                  <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </QuizesProvider>
        </FlashcardProvider>
      </GroupProvider>
    </UserProvider>
  )
}

export default App;
