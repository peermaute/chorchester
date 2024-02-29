import Image from "next/image";

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
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      {users.map((user) => (
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
          <div className="flex flex-col lg:ml-20 mb-3 lg:mb-0">
            <p className="mb-3">Name: {user.name}</p>
            <p>Ensemble: {user.ensemble}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
