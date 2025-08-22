import type { User } from "../../type";

interface UserCardProps {
    user: User;
}

const UserCard = (props: UserCardProps) => {
    return (
        <div>
            <h2>{props.user.name}</h2>
            <p>Age: {props.user.age}</p>
        </div>
    );
}


export default UserCard;