import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../contex/CaptainContex";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  // const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = React.useContext(CaptainContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName,
        lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };
    console.log(captainData);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-login");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPlate("");
    setColor("");
    setCapacity(1);
    setVehicleType("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-10" src="Uber.png" alt="" />

        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 ">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="first_name"
              className="bg-[#eeee] mb-3 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base "
              id="first_user_name"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="last_name"
              className="bg-[#eeee] mb-3 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base "
              id="last_user_name"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="user_email"
            className="bg-[#eeee] mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base "
            id="user_email"
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="user_password"
            className="bg-[#eeee] mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base "
            placeholder="password"
            id="user_password"
            required
          />
          <h3 className="text-lg font-medium mb-2">Details Of Vehicle</h3>
          <div className="flex flex-col gap-0">
            <div className="flex gap-4 mb-0">
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                name="vehicle_plate"
                className="bg-[#eeee] mb-7 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base "
                placeholder="Plate Number"
                id="vehicle_plate"
                required
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                name="vhicle_color"
                className="bg-[#eeee] mb-7 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base "
                placeholder="Vehicle Color"
                id="vhicle_color"
                required
              />
            </div>
            <div className="flex gap-4 mb-0">
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                name="vehicle_capacity"
                className="bg-[#eeee] mb-7 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base "
                placeholder="Capacity"
                id="vehicle_capacity"
                required
              />
              <select
                value={vehicleType}
                className="bg-[#eeee] mb-7 rounded px-4 py-2  w-1/2 text-lg placeholder:text-base"
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have captain Account?{" "}
          <Link to="/captain-login" className="text-blue-600  ">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
