"use client";

import { useEffect, useState } from "react";

const words = [
  { text: "Revenue.",              color: "#1B5EA8" },
  { text: "Profit.",               color: "#85BB65" },
  { text: "Customer Satisfaction.", color: "#1B5EA8" },
];

export default function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        color: words[index].color,
        display: "block",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      {words[index].text}
    </span>
  );
}
