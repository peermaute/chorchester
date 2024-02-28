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
];

const UserList: React.FC = () => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Image
            src={user.picture}
            alt={"Image not found"}
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
