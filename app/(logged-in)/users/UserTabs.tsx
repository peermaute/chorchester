"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "./UserCard";
import { User } from "@/app/types/User";

interface UserTabsProps {
  users: User[];
}

export default function UserTabs({ users }: UserTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.ensemble.toLowerCase() === activeTab);

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-4 items-center">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex justify-center"
        >
          <TabsList className="grid grid-cols-3 min-w-[280px]">
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="kammerchor">Kammerchor</TabsTrigger>
            <TabsTrigger value="orchester">Orchester</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}
