"use client";
import { useState } from "react";
import { SegmentedControl } from "@primer/react";
import UserCard from "./UserCard";

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
      <div className="mb-5 shadow-md">
        <SegmentedControl
          aria-label="userListFilter"
          onChange={handleFilterChange}
          sx={{ backgroundColor: "white" }}
        >
          <SegmentedControl.Button defaultSelected>
            Alle
          </SegmentedControl.Button>
          <SegmentedControl.Button>Kammerchor</SegmentedControl.Button>
          <SegmentedControl.Button>Orchester</SegmentedControl.Button>
        </SegmentedControl>
      </div>
      {userList.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UserList;
