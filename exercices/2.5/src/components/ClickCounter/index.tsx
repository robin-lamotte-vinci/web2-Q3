import { useState } from "react";
import "./ClickCounter.css";

interface ClickCounterProps {
  title: string;
  messageCount10?: string;
  messageOnMouseEnter?: string;
  children: React.ReactNode;
}

const ClickCounter = ({
  title,
  messageCount10 = "You are a master in the art of clicking !",
  messageOnMouseEnter = "Please click on me now!",
  children,
}: ClickCounterProps) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="counter-button">
        {isHovered ? (
          <div>
            {messageOnMouseEnter}
            <br />
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}

        <button
          onClick={() => setCount((count) => count + 1)}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          count is {count}
        </button>
      </div>
      {count >= 10 && <p> {messageCount10}</p>}
      {children}
    </div>
  );
};

export default ClickCounter;
