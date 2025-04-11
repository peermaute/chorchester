"use client";
import { getUsersByName } from "@/app/api/users";
import { User } from "@/app/types/User";
import { useState } from "react";
import UserCard from "../users/UserCard";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [noUserFound, setNoUserFound] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!input) return;
    try {
      const result = await getUsersByName(input);
      if (result.length === 0) {
        setUsers([]);
        setNoUserFound(true);
        return;
      }
      setNoUserFound(false);
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setNoUserFound(true);
    }
    setInput("");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex w-11/12 xl:w-2/3 flex-col items-center">
        <div className="relative flex items-center mb-7 w-11/12">
          <input
            type="text"
            value={input}
            tabIndex={1}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Search for User"
            autoFocus
            className="block w-full rounded-xl border border-muted bg-background px-5 py-4 pr-14 tracking-wider text-foreground drop-shadow-sm transition placeholder:text-muted-foreground/60 hover:drop-shadow-md focus:outline-none focus:border-muted-foreground/40 focus:ring-0 focus:drop-shadow-md"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <div
            className="absolute inset-y-0 right-0 flex py-3 pr-3 hover:cursor-pointer"
            onClick={() => {
              handleSubmit();
            }}
          >
            <kbd className="inline-flex items-center rounded border border-muted px-2 pt-1 font-sans text-xs text-muted-foreground/60">
              ↵
            </kbd>
          </div>
        </div>
        {users.map((user) => (
          <div className="w-full lg:w-3/4" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
        {noUserFound && (
          <p className="text-center text-muted-foreground/60">
            No user found ☹
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
