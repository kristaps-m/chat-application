"use client";
import Image from "next/image";
import { useState } from "react";

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
  return (
    // MAIN = className="flex min-h-screen flex-col items-center justify-between p-24"
    <main>
      <h1>HELLO WORLD :)</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>01</div>
        <div>02</div>
        <div>
          {theUsers.map((oneUser) => {
            return (
              <div key={oneUser.id}>
                <h1>{oneUser.fullName}</h1>
              </div>
            );
          })}
        </div>
        <div>04</div>
      </div>
    </main>
  );
}
