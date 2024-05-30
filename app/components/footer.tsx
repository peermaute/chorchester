"use client";
import { ListIcon } from "./list-icon";
import { SearchIcon } from "./search-icon";
import { UserIcon } from "./user-icon";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Footer = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("users");
  return (
    <footer>
      <nav className="mb-4 mt-4">
        <ul className="flex">
          <li
            className="mr-12 hover:cursor-pointer lg:mr-32"
            onClick={() => {
              setCurrentPage("users");
              router.push("/users");
            }}
          >
            <ListIcon
              currentColor={currentPage === "users" ? "#f85046" : "#000000"}
            />
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => {
              setCurrentPage("search");
              router.push("/search");
            }}
          >
            <SearchIcon
              currentColor={currentPage === "search" ? "#f85046" : "#000000"}
            />
          </li>
          <li
            className="ml-12 hover:cursor-pointer lg:ml-32"
            onClick={() => {
              setCurrentPage("profile");
              router.push("/profile");
            }}
          >
            <UserIcon
              currentColor={currentPage === "profile" ? "#f85046" : "#000000"}
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
