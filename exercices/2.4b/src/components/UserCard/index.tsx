import type { User } from "../../type";
import "./UserCard.css"

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card">
      <h2 className="name">{user.name}</h2>
      <p className="age">Âge : {user.age}</p>
      <div className="status">
        <span className={user.isOnline ? "online" : "offline"}>
            {user.isOnline ? "En ligne" : "Hors ligne"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
