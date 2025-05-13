// 'use client' 

// export default function Video() {

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

//     return (
//         <div>
//              <main>
//                 <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
//              </main>
//         </div>
//     )
// }