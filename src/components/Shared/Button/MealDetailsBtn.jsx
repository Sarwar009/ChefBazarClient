import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const MealDetailsBtn = ({ mealId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!mealId || !mealId) return null;

  const handleDetails = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/meals/${mealId}`);
    }
  };

  return (
    <button
      onClick={handleDetails}
      className="mt-5 px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      See Details
    </button>
  );
};

export default MealDetailsBtn;
