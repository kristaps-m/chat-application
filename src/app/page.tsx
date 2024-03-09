"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
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
  const usersStore = useUsers();
  const [searchUser, setSeachUser] = useState("");
  const [clickedUserID, setClickedUserID] = useState<number | null>(null);

  useEffect(() => {
    usersStore.fetchUsers();
    usersStore.searchUser(searchUser);
  }, [searchUser, usersStore]);

  function returnClickedPersonsMessages() {
    if (clickedUserID !== null) {
      if (usersStore.users.length > 0) {
        try {
          return (
            <div className="pb-2 px-4">
              {usersStore.users
                .filter((u: IUser) => u.id === clickedUserID)[0]
                .theMessages.map((m: string, index: number) => {
                  return (
                    <div key={index} className="text-right">
                      <p className={chatApplication.personsMessages}>{m}</p>
                    </div>
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
        <div className={chatApplication.userSearchBox}>
          {/* Button with image */}
          <button>
            <Image
              src="/pictures/dropDown.png"
              width={61}
              height={45}
              alt="dropDown"
            />
          </button>
          {/* Input field */}
          <div className={chatApplication.inputContainer}>
            <input
              className="h-12 rounded min-w-full"
              type="text"
              placeholder="Search"
              value={searchUser}
              onChange={(event) => setSeachUser(event.target.value)}
            />
          </div>
        </div>
        <div className={chatApplication.userSearchBox}>
          {/* 02 Clicked Users Fullname and 4 buttons*/}
          <div className={chatApplication.inputContainer}>
            <div>
              <h1 className="min-w-full font-bold">
                {/* Search by ID */}
                {usersStore.returnClickedUsersFullname(clickedUserID)}
              </h1>
              <p>{clickedUserID && "24.12.2023 12:31"}</p>
            </div>
          </div>
          <button>
            <Image
              src="/pictures/phone.png"
              width={61}
              height={45}
              alt="dropDown"
            />
          </button>
          <button>
            <Image
              src="/pictures/searchIcon.png"
              width={61}
              height={45}
              alt="dropDown"
            />
          </button>
          <button>
            <Image
              src="/pictures/iconUknown.png"
              width={61}
              height={45}
              alt="dropDown"
            />
          </button>
          <button>
            <Image
              src="/pictures/threeDots.png"
              width={61}
              height={45}
              alt="dropDown"
            />
          </button>
        </div>
        <div>
          {/* 03 List of Users */}
          {usersStore.users.map((oneUser: IUser) => {
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
                <div className={chatApplication.userBox}>
                  {profilePicuterOrInitials(oneUser)}
                  <div>
                    <h1 className="text-lg">{oneUser.fullName}</h1>
                    <p>
                      You:...{" "}
                      {oneUser.theMessages[
                        oneUser.theMessages.length - 1
                      ].slice(-12)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {/* 04 Clicked User messages / Enter message field*/}
          <div className={chatApplication.clickedPersonsMessages}>
            {returnClickedPersonsMessages()}
          </div>
          <div className={chatApplication.userSearchBox}>
            <button>
              <Image
                src="/pictures/atachFile.png"
                width={61}
                height={45}
                alt="dropDown"
              />
            </button>
            <div className={chatApplication.inputContainer}>
              <h1 className="min-w-full">
                <input
                  className="h-12 rounded min-w-full"
                  type="text"
                  placeholder="Write a message..."
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const inputElement = event.target as HTMLInputElement;
                      const inputValue = inputElement.value;
                      // Call your function with the input value
                      usersStore.addTextToMessagesWhenEnterPressed(
                        inputValue,
                        clickedUserID
                      );
                      // Clear the input field
                      inputElement.value = "";
                    }
                  }}
                />
              </h1>
            </div>
            <button>
              <Image
                src="/pictures/faces.png"
                width={61}
                height={45}
                alt="dropDown"
              />
            </button>
            <button>
              <Image
                src="/pictures/microphone.png"
                width={61}
                height={45}
                alt="dropDown"
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
});
