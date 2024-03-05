"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateMockUsers } from "./mockData";

interface IUser {
  id: number;
  fullName: string;
  profileImage: string;
  theMessages: string[];
}

export default function Home() {
  // users List for testing.
  let usersList = [
    {
      id: 1,
      fullName: "Janis Berzins",
      profileImage: "1.jpg",
      theMessages: ["hello 1", "how?"],
    },
    {
      id: 2,
      fullName: "Karlis Lielais",
      profileImage: "2.jpg",
      theMessages: ["hello 2", "how?"],
    },
  ];

  const [theUsers, setTheUsers] = useState<IUser[]>([]);
  const [searchUser, setSeachUser] = useState("");
  const [clickedUserID, setClickedUserID] = useState<number | null>(null);

  useEffect(() => {
    // Fetch mock data when the component mounts
    const mockUsers = generateMockUsers();
    setTheUsers(mockUsers);
    let tempUsers = [...theUsers];
    tempUsers = tempUsers.filter((u) =>
      u.fullName.toLowerCase().includes(searchUser.toLowerCase())
    );
    setTheUsers(tempUsers);
    if (searchUser === "") {
      setTheUsers(mockUsers);
    }
  }, [searchUser]);

  function addTextToMessagesWhenEnterPressed(stringPressEnter: string) {
    let tempUsers = [...theUsers];
    for (let index = 0; index < tempUsers.length; index++) {
      if (tempUsers[index].id === clickedUserID) {
        tempUsers[index].theMessages.push(stringPressEnter);
      }
    }

    setTheUsers(tempUsers);
  }

  function returnClickedUsersFullname() {
    if (clickedUserID) {
      if (theUsers.length > 0) {
        let fullName;
        try {
          fullName = theUsers.filter((u) => u.id === clickedUserID)[0].fullName;
          return fullName;
        } catch (error) {
          return "";
        }
      } else {
        return "";
      }
    }

    return "";
  }

  function returnClickedPersonsMessages() {
    if (clickedUserID !== null) {
      if (theUsers.length > 0) {
        try {
          return (
            <div className="pb-2 px-4">
              {theUsers
                .filter((u) => u.id === clickedUserID)[0]
                .theMessages.map((m, index) => {
                  return (
                    <p key={index} className="bg-green-200 my-2 p-2">
                      {m}
                    </p>
                  );
                })}
            </div>
          );
        } catch (error) {
          return <p></p>;
        }
      } else {
        return <p></p>;
      }
    }

    return <p></p>;
  }

  function profilePicuterOrInitials(oneUser: IUser) {
    if (oneUser.profileImage) {
      return (
        <img
          src={`/pictures/${oneUser.profileImage}`}
          alt={oneUser.fullName
            .split(" ")
            .map((x) => x[0].toUpperCase())
            .join(".")}
          className="w-20 h-20 rounded-full object-cover"
        />
      );
    } else {
      return (
        <div className="w-20 h-20 rounded-full object-cover bg-red-800 flex items-center justify-center text-white text-4xl">
          {oneUser.fullName
            .split(" ")
            .map((x) => x[0].toUpperCase())
            .join(".")}
        </div>
      );
    }
  }

  return (
    // MAIN = className="flex min-h-screen flex-col items-center justify-between p-24"
    <main>
      <h1>HELLO WORLD :)</h1>
      <div
        className="grid grid-cols-2 gap-4"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <div>
          01
          <input
            className="min-w-full"
            type="text"
            placeholder="   Search"
            value={searchUser}
            onChange={(event) => setSeachUser(event.target.value)}
          />
          <h1>{searchUser}</h1>
        </div>
        <div>
          02
          {/* Search by ID */}
          {returnClickedUsersFullname()}
        </div>
        <div>
          03
          {theUsers.map((oneUser) => {
            return (
              <div
                key={oneUser.id}
                className={
                  clickedUserID === oneUser.id
                    ? "clicked hover-pointer"
                    : "hover-pointer"
                }
                onClick={() => {
                  setClickedUserID(oneUser.id);
                }}
              >
                <div className="flex flex-row">
                  {profilePicuterOrInitials(oneUser)}
                  <h1 className="text-lg">{oneUser.fullName}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          04
          <div className="min-h-full bg-green-400 flex justify-end items-end">
            {returnClickedPersonsMessages()}
          </div>
          <input
            className="min-w-full"
            type="text"
            placeholder="Write a message..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const inputElement = event.target as HTMLInputElement;
                const inputValue = inputElement.value;
                // Call your function with the input value
                addTextToMessagesWhenEnterPressed(inputValue);
                // Clear the input field
                inputElement.value = "";
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
