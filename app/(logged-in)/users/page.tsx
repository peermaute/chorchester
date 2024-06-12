"use client";
import { useEffect, useState } from "react";
import { SegmentedControl } from "@primer/react";
import UserCard from "./UserCard";
import { getUsers } from "@/app/api/users";
import { User } from "@/app/types/User";

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [dbUsers, setDbUsers] = useState<User[]>([]);
  const handleFilterChange = (index: number) => {
    if (index === 0) {
      setUserList(dbUsers);
    } else if (index === 1) {
      setUserList(dbUsers.filter((user) => user.ensemble === "Kammerchor"));
    } else {
      setUserList(dbUsers.filter((user) => user.ensemble === "Orchester"));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const dbUsers = await getUsers();
      dbUsers.sort((userA, userB) => {
        if (userA.name === "Peer Maute") return -1;
        if (userB.name === "Peer Maute") return 1;
        return userA.name.localeCompare(userB.name);
      });
      setDbUsers(dbUsers);
      setUserList(dbUsers);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="mb-5 shadow-md">
        <SegmentedControl
          aria-label="userListFilter"
          onChange={handleFilterChange}
          sx={{ backgroundColor: "#ecf9fc" }}
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
