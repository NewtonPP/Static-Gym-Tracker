import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext'; // Assuming you have an AuthContext

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext(); // Get the current authenticated user

  useEffect(() => {
    const checkDailyProgress = () => {
      if (!authUser) {
        navigate('/login'); // Ensure user is logged in
        return;
      }

      const userId = authUser._id; // Use user ID or any unique identifier
      const today = new Date().toISOString().split('T')[0];
      const lastSubmittedDates = JSON.parse(localStorage.getItem('lastSubmittedDates')) || {};

      if (lastSubmittedDates[userId] !== today) {
        navigate('/questions');
      }
    };

    checkDailyProgress();
  }, [navigate, authUser]);

  return children;
};

export default ProtectedRoute;
