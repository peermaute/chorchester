"use client";
import Image from "next/image";
import { useState } from "react";
import { SegmentedControl } from "@primer/react";

interface User {
  id: number;
  name: string;
  picture: string;
  ensemble: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    picture: "/person.svg",
    ensemble: "Kammerchor",
  },
  {
    id: 2,
    name: "Jane Smith",
    picture: "/person.svg",
    ensemble: "Orchester",
  },
  {
    id: 3,
    name: "Max Mustermann",
    picture: "/person.svg",
    ensemble: "Kammerchor",
  },
  {
    id: 4,
    name: "Maria Musterfrau",
    picture: "/person.svg",
    ensemble: "Orchester",
  },
  {
    id: 5,
    name: "Hans Hansen",
    picture: "/person.svg",
    ensemble: "Kammerchor",
  },

  {
    id: 6,
    name: "Anna Anders",
    picture: "/person.svg",
    ensemble: "Orchester",
  },
  {
    id: 7,
    name: "Peter Peterson",
    picture: "/person.svg",
    ensemble: "Kammerchor",
  },
  {
    id: 8,
    name: "Petra Peters",
    picture: "/person.svg",
    ensemble: "Orchester",
  },
];

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>(users);
  const handleFilterChange = (index: number) => {
    if (index === 0) {
      setUserList(users);
    } else if (index === 1) {
      setUserList(users.filter((user) => user.ensemble === "Kammerchor"));
    } else {
      setUserList(users.filter((user) => user.ensemble === "Orchester"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="mb-5">
        <SegmentedControl
          aria-label="userListFilter"
          onChange={handleFilterChange}
        >
          <SegmentedControl.Button defaultSelected>
            Alle
          </SegmentedControl.Button>
          <SegmentedControl.Button>Kammerchor</SegmentedControl.Button>
          <SegmentedControl.Button>Orchester</SegmentedControl.Button>
        </SegmentedControl>
      </div>
      {userList.map((user) => (
        <div
          className="rounded-md bg-white mb-3 p-3 shadow-sm shadow-slate-400 w-2/3 lg:w-1/4 flex flex-col lg:flex-row justify-center items-center"
          key={user.id}
        >
          <Image
            src={user.picture}
            alt={"Profile Picture"}
            width={200}
            height={200}
          />
          <div className="flex flex-col lg:ml-20 mb-3 lg:mb-0 text-center">
            <p className="mb-3 text-2xl">{user.name}</p>
            <p>{user.ensemble}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
