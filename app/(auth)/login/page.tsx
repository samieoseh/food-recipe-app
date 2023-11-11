import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mt-4 space-y-4 mx-12 md:w-[28rem] md:mx-auto">
      <h1 className="text-2xl">Welcome Back!</h1>
      <p className="text-xs text-gray-500">Sign in to your account</p>
      <AuthForm mode="Sign In" />
      <p className="text-xs text-center">
        Don&quot;t have an account{" "}
        <Link href="/signup" className="underline">
          Sign Up Now
        </Link>
      </p>
    </div>
  );
}
