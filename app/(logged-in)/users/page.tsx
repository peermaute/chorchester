"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "./UserCard";
import { getUsers } from "@/app/api/users";
import { User } from "@/app/types/User";

export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [dbUsers, setDbUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const handleFilterChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setUserList(dbUsers);
    } else {
      setUserList(dbUsers.filter((user) => user.ensemble === value));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setDbUsers(users);
      setUserList(users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-4 items-center">
        <Tabs
          value={activeTab}
          onValueChange={handleFilterChange}
          className="w-[300px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Kammerchor">Kammerchor</TabsTrigger>
            <TabsTrigger value="Orchester">Orchester</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4">
        {userList.length === 0 && <p className="text-gray-400">Loading...</p>}
        {userList.map((user) => (
          <div className="w-full" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
