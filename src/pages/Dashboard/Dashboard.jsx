import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";


export const Dashboard = () => {
  const { user, role } = useAuth();

  if (!user) return <p>Login to see dashboard</p>;
  if (!role) return <p>no role</p>

  return (
    <div>
      <Dashboard />
    </div>
  );
};