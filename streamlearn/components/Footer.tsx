export default function component() {
    return (
        <>
            <footer className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 StreamLearn. Tous droits réservés.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-sm hover:underline">À propos</a>
          <a href="#" className="text-sm hover:underline">Contact</a>
          <a href="#" className="text-sm hover:underline">Mentions légales</a>
        </div>
      </div>
    </footer>
        </>
    );
}