import Image from "next/image";

interface User {
  id: number;
  picture: string;
  name: string;
  ensemble: string;
}
const UserCard = ({ user }: { user: User }) => {
  return (
    <div
      className="rounded-md bg-white mb-3 p-3 shadow-md w-2/3 xl:w-1/3 2xl:w-1/5 flex"
      key={user.id}
    >
      <Image
        src={user.picture}
        alt={"Profile Picture"}
        width={70}
        height={70}
        className="rounded-xl shadow-md"
      />
      <div className="flex flex-col ml-5 lg:ml-20 justify-center">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-500 text-sm">{user.ensemble}</p>
      </div>
    </div>
  );
};

export default UserCard;
