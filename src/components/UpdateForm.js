import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = () => {
  const [name, setName] = useState("");
  const [socialhandle, setSocialandle] = useState("");
  const [followers, setFollowers] = useState();
  const [error,setError]=useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("https://mernappbackend-i3wk.onrender.com/getinfluencer/" + id).then((res) => {
      setName(res.data.name);
      setFollowers(res.data.followers);
      setSocialandle(res.data.socialhandle);
    });
  }, []);

  const updateinfluencer = (e) => {
    e.preventDefault();
    if(name && socialhandle && followers){
      axios
      .put("https://mernappbackend-i3wk.onrender.com/updateinfluencer/" + id, {
        name,
        socialhandle,
        followers,
      })
      .then(() => {
        navigate("/");
      })
      .catch(err=>setError("Failed to update"));
    }else{
      setError("All Fields should be filled")
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#d0cece] rounded-lg px-4 py-7 w-4/12">
        <div className="text-center text-3xl font-semibold">Add Influencer</div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-xl ">Name:</label>
            <input
              type="text"
              placeholder="Enter name"
              className="rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xl">Social Media Handle:</label>
            <input
              type="text"
              placeholder="Enter your social media handle"
              className="rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 "
              value={socialhandle}
              onChange={(e) => setSocialandle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xl">Followers:</label>
            <input
              type="number"
              placeholder="Enter your Followers"
              className="rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 "
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 text-red-500 text-lg">{error}</div>
        <div className="flex gap-4 mt-5">
          <button
            onClick={updateinfluencer}
            type="button"
            class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 font-medium leading-normal text-neutral-50 transition"
          >
            Update
          </button>
          <Link
            to={"/"}
            type="button"
            class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 font-medium leading-normal text-neutral-50 transition"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
