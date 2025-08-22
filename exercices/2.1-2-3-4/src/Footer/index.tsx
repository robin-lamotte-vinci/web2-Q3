import "./Footer.css"

interface FooterProps {
    imageUrl?: string;
    children?: React.ReactNode;
}

const Footer = (props: FooterProps) => {
    return (
        <footer className="footer">
            {props.imageUrl ? (
                <img src={props.imageUrl} alt="" className="logo"/>
            ) : null}
            {props.children}
        </footer>
    );
}


export default Footer;