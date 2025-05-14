"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
const [error, setError] = useState("");
const router = useRouter();

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
};
return (
    <>
 <div className=" h-screen items-start bg-cover bg-center bg-gradient-to-r from-indigo-800 to-blue-900 dark:bg-gradient-to-r flex justify-center">
     <div className="bg-white mt-40 rounded-xl shadow-2xl h-auto p-4 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">Login</h2>
        <form method="POST" onSubmit={handleSubmit} id="registrationForm" className="space-y-6">
         {error && <div className="">{error}</div>}
            <div>
                <label htmlFor="email" className="block text-indigo-900 font-semibold mb-2">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300" 
                    placeholder="Enter your email" 
                    required
                />
                <p className="text-red-500 text-sm mt-2 hidden" id="emailError">Please enter a valid email.</p>
            </div>

            <div>
                <label htmlFor="password" className="block text-indigo-900 font-semibold mb-2">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300" 
                    placeholder="Enter your password" 
                    required
                />
                <p className="text-red-500 text-sm mt-2 hidden" id="passwordError">Password is required.</p>
            </div>

            <input
              value="Login"
                type="submit" 
                className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
            />
        </form>

        <p className="text-center text-gray-600 mt-6">
            Already have an account? 
            <Link href="/register" className="text-indigo-800 font-semibold hover:text-blue-900 transition-colors duration-300">Inscription</Link>
        </p>
    </div>
 </div>
 </>
)
};