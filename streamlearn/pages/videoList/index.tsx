import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function components () {

     const [data, setData] = useState([]);

    let fetchData = async () => {
        try {
    
          const response = await fetch('/api/Video');
          const result = await response.json();
          console.log(result)
          setData(result);
        } catch (error) {
          console.log(error)
        }
      }

      const removevideo = async (id: number)  => {
        try {
            console.log(id)
            await fetch(`/api/Video?id=${id}`, {
                method: 'DELETE'
            });
            fetchData();
        } catch (error) {
            console.error(" problème lors de la suppression", error);
        }
    }
    
      useEffect(
                () => {
                    fetchData();
                }, []
            )

    return(
        <>
        <Header />
            <section className="text-gray-900 bg-gray-200 mb-16">
                    <h1 className="text-2xl font-bold mb-4">Liste des Vidéo</h1>

                    <div className="hidden md:block">
                        <table className="w-full bg-white shadow rounded text-sm">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                            <th className="text-left p-3">Titre</th>
                            <th className="text-left p-3">Description</th>
                            <th className="text-right p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-orange-100">
                                <td className="p-3">{item.title}</td>
                                <td className="p-3 text-gray-700">{item.content}</td>
                                <td className="p-3 text-right">
                                <button onClick={() => removevideo(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                                    Supprimer
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </section>
            <Footer />
        </>

    )
}