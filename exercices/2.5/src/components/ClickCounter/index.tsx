import { useState } from "react";

interface ClickCounterProps {
    title: string;
    message: string;
    children: React.ReactNode;
}

const ClickCounter = ({title, message, children} : ClickCounterProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
        <h2>{title}</h2>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {count >= 10 && <p> {message}</p>}
      {children}

    </div>
  );
};

export default ClickCounter;
