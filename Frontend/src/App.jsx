import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './Context/AuthContext'
import Header from './Components/Header'
import MainPage from './Page/MainPage'
import HomePage from './Page/HomePage'
import AddDay from './Page/AddDay'
import ExercisePage from './Page/ExercisePage'
import AddExercise from './Page/AddExercise'
import EditExercise from './Page/EditExercise'
import History from './Page/History'
import GetStarted from './Page/GetStarted'
import SignIn from './Page/SignIn'
import SignUp from './Page/SignUp'
import Profile from './Page/Profile'
import WorkoutHistory from './Components/Workout-History'
import MealHistory from './Components/Meal-History'
import ErrorPage from './Page/ErrorPage'



function App() {
  const {authUser} = useAuthContext();
 return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<GetStarted/>}/>
        <Route path='/home' element={authUser?<HomePage/>:<ErrorPage/>}/>
        <Route path='/addday' element={authUser?<AddDay/>:<ErrorPage/>}/>
        <Route path='/exercises' element={authUser?<ExercisePage/>:<ErrorPage/>}/>
        <Route path= "/addexercise" element={authUser?<AddExercise/>:<ErrorPage/>}/>
        <Route path='/editexercise/:id' element={authUser?<EditExercise/>:<ErrorPage/>}/>
        <Route path='/history' element={authUser?<History/>:<ErrorPage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile/:id' element={authUser?<Profile/>:<ErrorPage/>}/>
        <Route path='/history/workouthistory' element={authUser?<WorkoutHistory/>:<ErrorPage/>}/>
        <Route path='/history/mealhistory' element={authUser?<MealHistory/>:<ErrorPage/>}/>
    </Routes>
  </Router>
  </>
 )
}

export default App
