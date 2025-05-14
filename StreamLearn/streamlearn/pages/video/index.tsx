import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Video() {
    const router= useRouter();
    const {id} =router.query;
    const [data, setData] = useState([]);

    let fetchData = async () => {
        try {
            const response = await fetch(`/api/Video/${id}`);
            const result = await response.json()
            setData(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(
            () => {
                 fetchData();
            }
        )
    
    return(
        <>
            <Header />
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 text-center mb-10">
                    {data.title}
                </h1>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                    <video
                    src={data.url}
                    controls
                    className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                    {data.content}
                    </p>
                </div>
                </div>
            </div>
            <Footer />
        </>
        
    )
}