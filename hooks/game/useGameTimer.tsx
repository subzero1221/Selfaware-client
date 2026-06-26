"use client";

import { useState, useEffect } from "react";

interface UseGameTimerProps {
  timeLimitSeconds: number;
  questionId: string;
  onTimeUp?: () => void;
}

export default function useGameTimer({
  timeLimitSeconds,
  questionId,
  onTimeUp,
}: UseGameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds || 30);

  useEffect(() => {
    setTimeLeft(timeLimitSeconds || 30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (onTimeUp) onTimeUp();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionId, timeLimitSeconds, onTimeUp]);

  return timeLeft;
}
