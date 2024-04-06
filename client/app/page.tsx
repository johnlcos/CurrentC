import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="flex flex-col items-center md:flex-row bg-surface p-8 py-4 gap-4 rounded-lg shadow-2xl">
        <Image
          src="/alerty.png"
          width={200}
          height={200}
          alt="Alerty Logo"
          style={{ borderRadius: "50%" }}
        />
        <div className="flex flex-col gap-2 p-3">
          <h2 className="text-center text-xl text-text-white font-semibold">
            Join Alerty!
          </h2>
          <p className="text-subtext-color">
            Stay up to date with the latest financial news!
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className="auth-button">
                <FaGoogle /> Sign up with Google
              </Link>
            </li>
            <li>
              <Link href="/signup" className="auth-button">
                Create Account
              </Link>
            </li>
            <li>
              <p className="text-center text-subtext-color">
                Already have an account?
              </p>
            </li>
            <li>
              <Link href="/login" className="auth-button">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
