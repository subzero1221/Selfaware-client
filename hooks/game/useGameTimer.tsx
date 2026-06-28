"use client";

import { useState, useEffect } from "react";

interface UseGameTimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

export default function useGameTimer({
  onTimeUp,
  initialTime,
}: UseGameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          onTimeUp();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return timeLeft;
}
