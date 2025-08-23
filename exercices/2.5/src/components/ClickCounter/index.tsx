import { useState } from "react";

interface ClickCounterProps {
    children: React.ReactNode;
}

const ClickCounter = ({children} : ClickCounterProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {children}

    </div>
  );
};

export default ClickCounter;
