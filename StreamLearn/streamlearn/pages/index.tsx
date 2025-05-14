import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {

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

  useEffect(
            () => {
                fetchData();
            }, []
        )


  return (
    <>
      <Header/>
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/background.jpg')" }}
      >
        {/* <!-- Overlay sombre --> */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            Bienvenue sur <span className="text-indigo-400">StreamLearn</span>
          </h1>
        </div>
      </div>

    {/* <div className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-12">Nos Vidéos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
         {data.map((item, index) => (
          <div key={index} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40">
            <video src={`/${item.url}`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">{item.title}</h3>
          </div>
         )) }
            
          
        </div> */}

            {/* </div>       */}
      <Footer/>
    </>
    
  );
}
