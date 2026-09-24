import Image from "next/image";

export default function Logo() {
  return (
    <Image
      alt="website icon"
      src={"/lightbulb_transparent.png"}
      width={80}
      height={80}
    />
  );
}
