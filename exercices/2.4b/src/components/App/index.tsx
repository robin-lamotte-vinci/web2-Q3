import type { User } from "../../type";
import UserCard from "../UserCard";
import "./App.css"

const App = () => {
  const users: User[] = [
    { name: "Alice Dupont", age: 28, isOnline: true },
    { name: "Bob Martin", age: 35, isOnline: false },
    { name: "Charlie Moreau", age: 22, isOnline: true },
  ];

  return (
    <div className="page">
        <div className="container">
      {users.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
      </div>
    </div>
  );
};

export default App;
