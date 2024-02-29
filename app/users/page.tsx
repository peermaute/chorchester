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
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Image
            src={user.picture}
            alt={"Profile Picture"}
            width={200}
            height={200}
          />
          <p>{user.name}</p>
          <p>{user.ensemble}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
