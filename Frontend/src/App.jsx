import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './Context/AuthContext';
import Header from './Components/Header';
import MainPage from './Page/MainPage';
import HomePage from './Page/HomePage';
import AddDay from './Page/AddDay';
import ExercisePage from './Page/ExercisePage';
import AddExercise from './Page/AddExercise';
import EditExercise from './Page/EditExercise';
import History from './Page/History';
import GetStarted from './Page/GetStarted';
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import Profile from './Page/Profile';
import WorkoutHistory from './Components/Workout-History';
import MealHistory from './Components/Meal-History';
import ErrorPage from './Page/ErrorPage';
import Questions from './Page/Questions';
import ProtectedRoute from './Components/ProtectedRoute'; // Make sure the path is correct
import ProgressChart from './Page/ProgressChart';

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <GetStarted />} />
          <Route path='/home' element={authUser ? <ProtectedRoute><HomePage /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/addday' element={authUser ? <ProtectedRoute><AddDay /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/exercises' element={authUser ? <ProtectedRoute><ExercisePage /></ProtectedRoute> : <ErrorPage />} />
          <Route path="/addexercise" element={authUser ? <ProtectedRoute><AddExercise /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/editexercise/:id' element={authUser ? <ProtectedRoute><EditExercise /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/history' element={authUser ? <ProtectedRoute><History /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/signin' element={authUser ? <HomePage /> : <SignIn />} />
          <Route path='/signup' element={authUser ? <HomePage /> : <SignUp />} />
          <Route path='/profile/:id' element={authUser ? <ProtectedRoute><Profile /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/history/workouthistory' element={authUser ? <ProtectedRoute><WorkoutHistory /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/history/mealhistory' element={authUser ? <ProtectedRoute><MealHistory /></ProtectedRoute> : <ErrorPage />} />
          <Route path='/questions' element={authUser ? <Questions /> : <ErrorPage />} />
          <Route path='/progress' element={authUser ? <ProgressChart/> : <ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
