import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="mt-4 space-y-4 mx-12 md:w-[28rem] md:mx-auto">
      <h1 className="text-2xl">Get Started</h1>
      <p className="text-xs text-gray-500">Create a new account now</p>
      <AuthForm mode="Sign Up" />
      <p className="text-xs text-center">
        Already have an account{" "}
        <Link href="/login" className="underline">
          Sign In Now
        </Link>
      </p>
    </div>
  );
}
