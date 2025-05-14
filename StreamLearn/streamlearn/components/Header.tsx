import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter();
  if (session) {
    console.log(session)
    if (session.user?.role === "admin") {
      return (
          <header className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* <!-- Logo / Nom du site --> */}
          <div className="flex-shrink-0 text-xl font-bold">
            StreamLearn
          </div>

          {/* <!-- Barre de recherche (desktop) --> */}
          <div className="hidden md:flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* <!-- Boutons (desktop) --> */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="hover:bg-indigo-500 px-4 py-2 rounded-md transition">Dashboard</Link>
            <Link href="/profile" className="hover:bg-indigo-500 px-4 py-2 rounded-md transition">Profil</Link>
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-md transition">Déconnexion</button>
          </div>
        </div>
      </div>
    </header>

      );
    }
    return (
      <>
       <header className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* <!-- Logo / Titre --> */}
              <div className="flex-shrink-0 text-xl font-bold">
                StreamLearn
              </div>

              {/* <!-- Barre de recherche (desktop) --> */}
              <div className="hidden md:flex flex-1 mx-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              {/* <!-- Boutons --> */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="/profile" className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-400 transition">Profil</a>
                <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-400 transition">Déconnexion</button>
              </div>
            </div>
          </div>
        </header>

        {/* Signed in as {session.user.email} <br /> */}
      </>
    )
  }
  return (
    <>
        <header className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* <!-- Logo / Titre --> */}
              <div className="flex-shrink-0 text-xl font-bold">
                <a href="/">StreamLearn</a>
              </div>

          {/* <!-- Barre de recherche --> */}
          <div className="hidden md:flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* <!-- Liens de navigation (desktop) --> */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => router.push('/login')} className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition">Connexion</button>
            <button onClick={() => router.push('/register')} className="bg-indigo-900 px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition">Inscription</button>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}