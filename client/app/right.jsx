import React, { useEffect, useState } from "react";

const UserListComponent = () => {
  // Sample fixed data for testing
  const users = [
    {
      id: 1,
      name: "Alice",
      status: "Open",
      message: "This is Alice's message.",
    },
    {
      id: 2,
      name: "Bob",
      status: "In Session",
      message:
        "Bob needs help! This is a very long message that will be truncated.",
    },
    { id: 3, name: "Charlie", status: "Open", message: "Not much to report." },
    {
      id: 4,
      name: "David",
      status: "In Session",
      message: "David will be done soon.",
    },
    {
      id: 5,
      name: "Eve",
      status: "Resolved",
      message: "Issue resolved successfully.",
    },
  ];

  // State to manage active tab
  const [activeTab, setActiveTab] = useState("All");

  // Filter users based on active tab
  const filteredUsers =
    activeTab === "All"
      ? users
      : users.filter((user) => user.status === activeTab);

      useEffect(()=>{
        const getRequests =async ()=>{
         try {
          const data = await fetch('http://localhost:8000/chat/get')
          const respons = data.json()
          // setChat(respons)
         } catch (error) {
          console.log(error)
          return
         }
        }
        
        getRequests()
      },[])
//////////////////////////////////////////////
const accept_req = (id)=>{
  const data =users.filter((user)=>(user.id !== id))
  console.log(data)
  console.log('clicked: ', id)
}
//////////////////////////////////////////////
  const renderUser = (user) => (
    <div
      key={user.id}
      className="flex items-center justify-between border-b border-gray-200 py-2 px-4"
    >
      <div className="flex flex-col">
        <span className="text-lg">{user.name}</span>
        {/* User Message */}
        <p className="text-gray-600 text-sm mt-1">
          {user.message.length > 20
            ? `${user.message.substring(0, 20)}...`
            : user.message}
        </p>
      </div>
      {/* Status Buttons */}
      <div className="flex">
        {user.status === "Open" && (
          <button
            className={`mr-2 px-4 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-700 flex justify-center items-center`}
          onClick={()=>accept_req(user.id)}
          >
            Open
          </button>
        )}
        {user.status !== "Open" && (
          <button
            disabled
            className={`mr-2 px-4 py-1 rounded bg-opacity-50 ${
              user.status === "In Session" ? "bg-orange-500" : "bg-green-500"
            } text-white font-bold cursor-not-allowed flex justify-center items-center`}
          >
            {user.status}
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
            activeTab === "Open" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("Open")}
        >
          Open Requests
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "In Session"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("In Session")}
        >
          In Session
        </button>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        <div className="overflow-y-auto">{filteredUsers.map(renderUser)}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4"></div>
    </div>
  );
};

export default UserListComponent;
