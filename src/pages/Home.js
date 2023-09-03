import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function formatNumberWithKAndM(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

const Home = () => {
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://mernappbackend-i3wk.onrender.com/getinfluencer")
      .then((res) => setData(res.data));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this influencer?"
    );
    if (confirmDelete) {
      axios.delete("https://mernappbackend-i3wk.onrender.com/deleteinfluencer/" + id).then(() => {
        window.location.reload();
      });
    }
  };
  const filteredData = data.filter((influencer) => {
    const nameMatch = influencer.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const handleMatch = influencer.socialhandle
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return nameMatch || handleMatch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "socialhandle":
        return a.socialhandle.localeCompare(b.socialhandle);
      case "followers":
        return a.followers - b.followers;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="w-10/12 m-auto mt-8">
        <div className="text-center text-6xl font-bold mt-8">
          Influencer Management System
        </div>
        <div className="text-right mt-7">
          {" "}
          <Link
            to={"/create"}
            type="button"
            className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 font-medium leading-normal text-neutral-50 transition"
          >
            Add Influencer
          </Link>
        </div>
        <div className="flex items-center">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search with name or social media handle"
            className="w-6/12 rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <label>Sort:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="socialhandle">Social Media Handle</option>
            <option value="followers">Followers</option>
          </select>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Social Media Handle
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Followers
                      </th>
                      <th scope="col" className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.length > 0 &&
                      sortedData.map((influencer) => (
                        <tr className="border-b dark:border-neutral-500" key={influencer._id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            {influencer.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {influencer.socialhandle}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatNumberWithKAndM(influencer.followers)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex gap-5">
                            <Link
                              to={`/update/${influencer._id}`}
                              type="button"
                              className="inline-block rounded border-2 border-[#48bace] px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info"
                              data-te-ripple-init
                            >
                              Update
                            </Link>
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-[#bf4a4a] px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal"
                              data-te-ripple-init
                              onClick={() => handleDelete(influencer._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
