import { useEffect, useState } from "react";

export default function CountdownTimer({ expirationDate }: { expirationDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  } | null>(null);

  useEffect(() => {
    function calculateRemaining() {
      const difference =
        new Date(expirationDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    }

    setTimeLeft(calculateRemaining());

    const interval = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  if (!timeLeft) return <span>...</span>;

  if (timeLeft.isExpired) {
    return (
      <span className="text-brutal-red font-black uppercase tracking-wider">
        ვადა ამოიწურა
      </span>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="font-mono font-bold">
      {timeLeft.days > 0 && `${timeLeft.days}დ `}
      {pad(timeLeft.hours)}ს : {pad(timeLeft.minutes)}წთ :{" "}
      {pad(timeLeft.seconds)}წმ
    </span>
  );
}