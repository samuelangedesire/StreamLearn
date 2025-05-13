import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Bienvenue sur StreamLearn 🎓</h1>
      </main>
      <button onClick={() => router.push("login") }>Sign in</button>
    </>
  )
}