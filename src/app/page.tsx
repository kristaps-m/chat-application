"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IUser {
  id: number;
  fullName: string;
  profileImage: string;
}

export default function Home() {
  let usersList = [
    { id: 1, fullName: "Janis Berzins", profileImage: "1.jpg" },
    { id: 2, fullName: "Karlis Lielais", profileImage: "2.jpg" },
    { id: 3, fullName: "Baiba Egle", profileImage: "3.jpg" },
    { id: 4, fullName: "Sandra Ozola", profileImage: "4.jpg" },
  ];
  const [theUsers, setTheUsers] = useState<IUser[]>(usersList);
  const [searchUser, setSeachUser] = useState("");
  const [clickedUserByIndex, setClickedUserByIndex] = useState(0);
  const [clickedUserID, setClickedUserID] = useState(theUsers[0].id);

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
          {/* Search by array index */}
          {/* {theUsers[clickedUserByIndex].fullName} */}
          {/* Search by ID */}
          {theUsers.filter((u) => u.id === clickedUserID)[0].fullName}
        </div>
        <div>
          03
          {theUsers.map((oneUser) => {
            return (
              <div
                key={oneUser.id}
                className={clickedUserID === oneUser.id ? "clicked" : ""}
              >
                <h1
                  onClick={() => {
                    setClickedUserID(oneUser.id);
                  }}
                  className="hover-pointer"
                >
                  {oneUser.fullName}
                </h1>
              </div>
            );
          })}
        </div>
        <div>04</div>
      </div>
    </main>
  );
}
