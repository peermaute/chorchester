"use client";
import { ListIcon } from "./list-icon";
import { SearchIcon } from "./search-icon";
import { UserIcon } from "./user-icon";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer>
      <nav className="mb-10">
        <ul className="flex">
          <li
            className="mr-10 hover:cursor-pointer"
            onClick={() => router.push("/users")}
          >
            <ListIcon />
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => router.push("/search")}
          >
            <SearchIcon />
          </li>
          <li
            className="ml-10 hover:cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <UserIcon />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
