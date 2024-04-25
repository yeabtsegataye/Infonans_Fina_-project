import axios from "axios";
import React, { useEffect, useState } from "react";

const UserListComponent = () => {
  // Access token (replace with your logic for fetching and storing it securely)
  const token = localStorage.getItem('access_token'); // Example using localStorage (not ideal)

  // State to manage active tab
  const [activeTab, setActiveTab] = useState("All");
  const [users, setUsers] = useState([]);

  // Filter users based on active tab
  const filteredUsers =
    activeTab === "All"
      ? users
      : users.filter((user) => user.session === activeTab);

  // Function to fetch user data with error handling
  const getRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8000/chat/getAll", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // You can display an error message to the user here
    }
  };
/////////////////////////////////
  useEffect(() => {
    getRequests();
  }, []);
/////////////////////////////////////////
  const accept_req =async (id) => {
    const data = users.filter((user) => user.id !== id);
    console.log(data);
    console.log("clicked: ", id);
    try {
      const response = await axios.patch(`http://localhost:8000/chat/in-session`,
      {
        chat_receiver : 3,
        chatId : id
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
    
    } catch (error) {
      console.error("Error changing it to in session:", error);
      // You can display an error message to the user here
    }
  };
  /////////////////////////////////////////////
console.log(users, "users")
  const renderUser = (user) => (
    <div
      key={user.id}
      className="flex items-center justify-between border-b border-gray-200 py-2 px-4"
    >
      <div className="flex flex-col">
        <span className="text-lg">{user?.name}</span>
        {/* User Message */}
        <p className="text-gray-600 text-sm mt-1">
          {user?.Title.length > 20
            ? `${user?.Title.substring(0, 20)}...`
            : user?.Title}
        </p>
      </div>
      {/* session Buttons */}
      <div className="flex">
        {user.session === "open" && (
          <button
            className={`mr-2 px-4 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-700 flex justify-center items-center`}
            onClick={() => accept_req(user.id)}
          >
            Open
          </button>
        )}
        {user.session !== "open" && (
          <button
            disabled
            className={`mr-2 px-4 py-1 rounded bg-opacity-50 ${
              user.session === "in_session" ? "bg-orange-500" : "bg-green-500"
            } text-white font-bold cursor-not-allowed flex justify-center items-center`}
          >
            {user.session}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex bg-gray-200 p-2 mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "All" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("All")}
        >
          All Requests
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "open" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("open")}
        >
          Open Requests
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "in_session" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("in_session")}
        >
          In Session
        </button>
      </div>

      {/* User List*/}

      <div className="flex flex-col">
        <div className="overflow-y-auto">{filteredUsers.map(renderUser)}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4"></div>
    </div>
  );
};

export default UserListComponent;
