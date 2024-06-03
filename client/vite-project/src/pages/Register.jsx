import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      toast.success("Logged in successfully");
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Login Failed: " + errorData.message);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full h-full md:w-1/2 flex justify-center items-center bg-pink-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-12 border border-gray-100 p-4 md:p-0">
        <form onSubmit={registerUser} className="w-full max-w-sm">
          <div>
            <h1 className="text-xl font-sans font-bold mt-10 text-center">
              Register Here
            </h1>
          </div>
          <div className="mt-5">
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                type="text"
                className="grow "
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                type="text"
                className="grow "
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="w-full bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <div className="mt-5">
              <Link to={"/login"} className="underline">
                Already have an account
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex md:w-1/2 justify-center items-center p-4 ">
        <p className="typewriter font-sans font-bold text-2xl">
          GLAD YOU ARE HERE!
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
