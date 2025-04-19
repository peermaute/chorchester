"use client";
import { getUsersByName } from "@/app/api/users";
import { User } from "@/app/types/User";
import { useState } from "react";
import UserCardSearch from "@/components/features/users/user-card-search";

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
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="relative flex items-center max-w-xs sm:max-w-sm mx-auto w-full">
          <input
            type="text"
            value={input}
            tabIndex={1}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Nach User suchen"
            autoFocus
            className="block w-full rounded-md border border-muted bg-background px-5 py-4 pr-14 tracking-wider text-foreground drop-shadow-sm transition placeholder:text-muted-foreground/60 hover:drop-shadow-md focus:outline-none focus:border-muted-foreground/40 focus:ring-0 focus:drop-shadow-md"
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
            <kbd className="inline-flex items-center rounded-md border border-muted px-2 pt-1 font-sans text-xs text-muted-foreground/60">
              ↵
            </kbd>
          </div>
        </div>
        <div className="grid gap-4">
          {users.map((user) => (
            <div className="w-full" key={user.id}>
              <UserCardSearch user={user} />
            </div>
          ))}
          {noUserFound && (
            <p className="text-center text-muted-foreground/60">
              No user found ☹
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
