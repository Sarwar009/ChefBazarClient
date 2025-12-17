import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
      <button onClick={() => navigate("/")} className="bg-blue-500  px-4 py-2 rounded">Go Home</button>
    </div>
  );
}



