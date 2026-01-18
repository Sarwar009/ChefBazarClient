import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const MealDetailsBtn = ({ mealId }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
      navigate(`/meals/${mealId}`);
    
  };

  return (
    <button
      onClick={handleDetails}
      className="px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500  rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      See Details
    </button>
  );
};

export default MealDetailsBtn;
