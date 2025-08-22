import "./Header.css"

interface HeaderProps {
    imageUrl?: string;
    children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="header">
            {props.imageUrl ? (
                <img src={props.imageUrl} alt="" className="logo"/>
            ) : null}
            {props.children}
        </header>
    );
}


export default Header;