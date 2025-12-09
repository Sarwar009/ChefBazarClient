import useAuth from "../../hooks/useAuth";


export const Dashboard = () => {
  const { user, role } = useAuth();

  if (!user) return <p>Login to see dashboard</p>;
  if (!role) return <p>no role</p>

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>Your role: {role}</p>

      {role === "admin" && <p>admin</p>}
      {role === "seller" && <p>seller</p>}
      {role === "user" && <p>user</p>}
    </div>
  );
};