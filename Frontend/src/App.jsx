import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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

function App() {
 return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<GetStarted/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/addday' element={<AddDay/>}/>
        <Route path='/exercises' element={<ExercisePage/>}/>
        <Route path= "/addexercise" element={<AddExercise/>}/>
        <Route path='/editexercise/:id' element={<EditExercise/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
    </Routes>
  </Router>
  </>
 )
}

export default App
