"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
// import { generateMockUsers } from "./mockData";
import chatApplication from "../../styles/chat-application.module.scss";
import IUser from "@/models/IUser";
import { useUsers } from "./store";

export default observer(function Home() {
  // simple users List for testing.
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

  // const [theUsers, setTheUsers] = useState<IUser[]>([]);
  const usersStore = useUsers();
  const [searchUser, setSeachUser] = useState("");
  const [clickedUserID, setClickedUserID] = useState<number | null>(null);

  useEffect(() => {
    usersStore.fetchUsers();
    // console.log(usersStore.users);
    // // Fetch mock data when the component mounts
    // const mockUsers = generateMockUsers();
    // setTheUsers(mockUsers);
    // let tempUsers = [...usersStore.users];
    // tempUsers = tempUsers.filter((u) =>
    //   u.fullName.toLowerCase().includes(searchUser.toLowerCase())
    // );
    // setTheUsers(tempUsers);
    // usersStore.setUsers(tempUsers);
    usersStore.searchUser(searchUser);
    // if (searchUser === "") {
    //   setTheUsers(mockUsers);
    // }
  }, [searchUser]);

  // function addTextToMessagesWhenEnterPressed(stringPressEnter: string) {
  //   let tempUsers = [...theUsers];
  //   for (let index = 0; index < tempUsers.length; index++) {
  //     if (tempUsers[index].id === clickedUserID) {
  //       tempUsers[index].theMessages.push(stringPressEnter);
  //     }
  //   }

  //   setTheUsers(tempUsers);
  // }

  function returnClickedUsersFullname() {
    if (clickedUserID) {
      if (usersStore.users.length > 0) {
        let fullName;
        try {
          fullName = usersStore.users.filter(
            (u: IUser) => u.id === clickedUserID
          )[0].fullName;
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

  // function returnClickedPersonsMessages() {
  //   if (clickedUserID !== null) {
  //     if (theUsers.length > 0) {
  //       try {
  //         return (
  //           <div className="pb-2 px-4">
  //             {theUsers
  //               .filter((u) => u.id === clickedUserID)[0]
  //               .theMessages.map((m, index) => {
  //                 return (
  //                   <div key={index} className="text-right">
  //                     <p className={chatApplication.personsMessages}>{m}</p>
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         );
  //       } catch (error) {
  //         return <p></p>;
  //       }
  //     } else {
  //       return <p></p>;
  //     }
  //   }

  //   return <p></p>;
  // }

  function profilePicuterOrInitials(oneUser: IUser) {
    if (oneUser.profileImage.includes("0")) {
      return (
        <div className={chatApplication.userWithoutPicture}>
          {oneUser.fullName
            .split(" ")
            .map((x) => x[0].toUpperCase())
            .join(".")}
        </div>
      );
    } else if (oneUser.profileImage) {
      return (
        <Image
          src={`/pictures/${oneUser.profileImage}`}
          width={20}
          height={20}
          alt={oneUser.fullName
            .split(" ")
            .map((x) => x[0].toUpperCase())
            .join(".")}
          className={chatApplication.userPicture}
        />
      );
    }
  }

  return (
    <main>
      <div
        className="grid grid-cols-2 gap-4"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <div className="ml-4">
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
          {/* theUsers.map().... */}
          {usersStore.users.map((oneUser: any) => {
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
                {/* border for testing */}
                <div className={chatApplication.userBox}>
                  {profilePicuterOrInitials(oneUser)}
                  <h1 className="text-lg">{oneUser.fullName}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          04
          {/* min-h-full bg-green-400 flex justify-end items-end */}
          {/* {chatApplication.clickedPersonsMessages} */}
          <div className={chatApplication.clickedPersonsMessages}>
            {/* {returnClickedPersonsMessages()} */}
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
                // addTextToMessagesWhenEnterPressed(inputValue);
                // Clear the input field
                inputElement.value = "";
              }
            }}
          />
        </div>
      </div>
    </main>
  );
});
