import SignupForm from "@/components/auth/SignupForm";

export default async function Signup() {
  return (
    <div className="max-w-md mx-auto h-screen flex items-center justify-center">
      <SignupForm/>
    </div>
  );
}