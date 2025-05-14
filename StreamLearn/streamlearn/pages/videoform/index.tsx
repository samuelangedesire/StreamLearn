'use client'
import { useState, useRef, FormEvent } from "react"
import Footer from "../../components/Footer"

 

export default function Video() {

    const [file, setFile]= useState(null);
    const [formData, setFormData] = useState({content: "", title: ""});
    const ref = useRef<HTMLFormElement>(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleInput = (e) => {
        const fieldname = e.target.name;
        const fieldvalue = e.target.value;

        setFormData((prevState) => (
            {
                ...prevState,
                [fieldname]: fieldvalue
            }
        ))
    }

    const handleSubmit = async ( e) => {
        e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('video', file);

         const response = await fetch("/api/Video",  {
        method: 'POST',
        body: form
        });
        if (response.ok) {
            const result = await response.json()
            console.log(result)
        } else {
            const result = await response.text();
            console.log(result)
        }
    }

    return (
        <div>
             <main className="bg-white p-1 xs:p-8">
               <div className=" max-w-96 sm:max-w-4xl mx-auto border border-[#4D7C0F] rounded-lg p-8">
                    <h2 className="sm:text-xl text-[12px] font-bold mb-6">Video upload</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label  className="text-xs xs:text-sm font-medium text-gray-700 mb-1 ">Title </label>
                                <input type="text" onChange={handleInput} value={formData.title} required id="title" className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2" name="title" />
                            </div>
                            <div>
                                <label  className="text-xs xs:text-sm font-medium text-gray-700 mb-1 ">Description</label>
                                <textarea onChange={handleInput} value={formData.content} required className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2" name="content"  ></textarea>
                            </div>
                            <div>
                                <label  className="text-xs xs:text-sm font-medium text-gray-700 mb-1 ">Choose video</label>
                                <input onChange={handleFile} required type="file" name="video" className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"/>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                            <button type="submit" className=" sm:w-[86px] w-full h-[50px] text-xs sm:text-base bg-[#4D7C0F] rounded-[5px] p-[13px_25px] gap-[10px] text-white">Submit</button>
                        </div>
                    </form>
               </div>
             </main>
             <Footer />
        </div>
    )
}

//     const handleUpload = (file) => {
//     if (!file) return;
 
//     const formData = new FormData();
//     formData.append('file', file);
 
//     const xhr = new XMLHttpRequest();
 
//     xhr.onload = (obj) => {
//       if (xhr.status === 200) {
//         alert("File uploaded successfully!")
//       } else {
//         alert("File could not be uploaded!")
//       }
//     };
 
//     xhr.onerror = () => {
//       alert("File could not be uploaded!")
//     };
 
//     xhr.open('POST', '/api/Video');
//     xhr.send(formData);
//   };