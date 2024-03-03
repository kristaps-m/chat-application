"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IUser {
  id: number;
  fullName: string;
  profileImage: string;
  theMessages: string[];
}

export default function Home() {
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
    {
      id: 3,
      fullName: "Baiba Egle",
      profileImage: "3.jpg",
      theMessages: ["hello 3", "how?"],
    },
    {
      id: 4,
      fullName: "Sandra Ozola",
      profileImage: "4.jpg",
      theMessages: ["hello 4", "how?"],
    },
    {
      id: 5,
      fullName: "Ingrida Vienīgā",
      profileImage: "",
      theMessages: [],
    },
  ];
  const [theUsers, setTheUsers] = useState<IUser[]>(usersList);
  const [searchUser, setSeachUser] = useState("");
  const [clickedUserID, setClickedUserID] = useState<number | null>(null);

  useEffect(() => {
    let tempUsers = [...theUsers];
    tempUsers = tempUsers.filter((u) =>
      u.fullName.toLowerCase().includes(searchUser.toLowerCase())
    );
    setTheUsers(tempUsers);
    if (searchUser === "") {
      setTheUsers(usersList);
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
          return theUsers
            .filter((u) => u.id === clickedUserID)[0]
            .theMessages.map((m, index) => {
              return <p key={index}>{m}</p>;
            });
        } catch (error) {
          return <p></p>;
        }
      } else {
        return <p></p>;
      }
    }

    return <p></p>;
  }

  return (
    // MAIN = className="flex min-h-screen flex-col items-center justify-between p-24"
    <main>
      <h1>HELLO WORLD :)</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          01
          <input
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
                  {oneUser.profileImage ? (
                    <img
                      src={`/pictures/${oneUser.profileImage}`}
                      alt={oneUser.fullName
                        .split(" ")
                        .map((x) => x[0].toUpperCase())
                        .join(".")}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full object-cover bg-red-800 flex items-center justify-center text-white text-4xl">
                      {oneUser.fullName
                        .split(" ")
                        .map((x) => x[0].toUpperCase())
                        .join(".")}
                    </div>
                  )}
                  <h1 className="text-lg">{oneUser.fullName}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          04
          {returnClickedPersonsMessages()}
          <input
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
