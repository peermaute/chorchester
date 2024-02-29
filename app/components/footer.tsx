"use client";
import { ListIcon } from "./list-icon";
import { SearchIcon } from "./search-icon";
import { UserIcon } from "./user-icon";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer>
      <nav className="mb-4 mt-4">
        <ul className="flex">
          <li
            className="mr-12 hover:cursor-pointer lg:mr-32"
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
            className="ml-12 hover:cursor-pointer lg:ml-32"
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
