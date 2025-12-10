import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const OrderBtn = ({ meal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!meal) return null;
  console.log(meal);
  
  const handleOrder = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate(`/order/${meal._id}`, { state: meal });

    }
  };

  return (
    <button
      onClick={handleOrder}
      className="mt-5 px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      Order Now
    </button>
  );
};

export default OrderBtn;
