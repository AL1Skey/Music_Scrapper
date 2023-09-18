// 'use client'
// import React, { useEffect } from 'react'
// import { useState, useMemo } from 'react'

// const Results = ({searchParams}) => {
//     const {link} = searchParams
//     const [data,setData]=useState([])

//     console.log(link)
//     const getData = async()=>{
//       await fetch('http://127.0.0.1:8000/results',{
//         method:"POST",
//         headers:{
//         "Content-Type":"application/json"},
//         body:JSON.stringify({"link":link})})
//         .then((res)=>setData([...data,res.json()]))}

//     useEffect(()=>{
//       getData()
//     },[])

// //   const [download,setDownload]=useState()
// //   const [downloads,setDownloads]=useState({})
// // console.log(data)
// // throw new Error(data)

//   const downloadHandler = async(e)=>{
//     e.preventDefault()

//     const link = e.target.value

//     const response = await fetch('http://127.0.0.1:8000/download',{method:"POST",headers:{
//         "Content-Type":"application/json"
//     },body:JSON.stringify({"link":link})}).then((res)=>res.json())

//     if (response.ok){
//         console.log("Sucess")
//     }
//     else{
//         console.log("Failed")
//     }
//   }

// //   const downloadList = (e)=>{

// //   }

// if(data){
//   return (
//     <div className=' p-5 border border-5 rounded-lg'>
//       <ul className="list-none grid gap-5">
//         {data.map((result)=>{
//           return(<li key={result["id"]} className='flex justify-around'>
//           <audio controls src={result["src"]}>
//           </audio>
//           <form  >
//             <input type="hidden" name="link" value={result["src"]}/>
//             <button type='submit' className='p-2 border border-2 rounded-lg '>Download</button>
//           </form>
//         </li>)
//         })}
//       </ul>
//     </div>
//   )}

// else{
//     return(
//         <h1>ERROOOR MISSING</h1>
//     )
// }
// }

// export default Results
"use client";
import React, { useCallback, useEffect, useState } from "react";

// Get data from api
async function getData(link, api) {
  try {
    // DO data processing with api
    const response = await fetch(api, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: link }),
    });
    console.log("response: ", response);

    //If error throw Error
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Wait for data to converted to json
    const data = await response.json();
    console.log("Data: ", data);
    // Return the processed data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or an empty array depending on your needs
  }
}

async function downloader(link,api){
  try{
    const download = await fetch(api,{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/octet-stream"
      },
      body:JSON.stringify({"link":link})
    }).catch((error)=>{
      console.error(error)
    })

    if(download.ok){
      // Handle downloaded object as binary
      const downloaded = await download.blob()
      return downloaded
    }
    else{
      throw new Error(`Request failed with status ${download.status}`)
    }
  }
  catch(error){
    console.error(error)
  }
}

const Results = ({ searchParams }) => {
  // Get link from parameter
  const { link } = searchParams;
  const [data, setData] = useState([]);

  //Do this function once
  useEffect(() => {
    // Create async function as workaround to promise
    // If I not do it, next will fetching twice every render
    async function invoke() {
      const output = await getData(link, "http://127.0.0.1:8000/results");
      setData(output);
      console.log("output:",output)
    }
    // If data is empty
    if (!data.length) {
      invoke()
      console.log(data)
    }
  });

  console.log(data);

  const downloadHandler = useCallback((e)=>{
      e.preventDefault();
      console.log(e.target.link.value)

      async function invoke(){
      await downloader(e.target.link.value,"http://127.0.0.1:8000/download")}

      invoke()

      console.log("downloader invoked")
  })

  if (data) {
    return (
      <div className=" p-5 border border-5 rounded-lg">
        <audio src="https://static.wikia.nocookie.net/blue-archive/images/8/8e/Constant_Moderato_%28Short%29.ogg/revision/latest?cb=20211122134548" width="420" style={{"max-width": "100%", "width": "420px"}} controls><a href="https://bluearchive.fandom.com/wiki/File:Constant_Moderato_(Short).ogg">https://bluearchive.fandom.com/wiki/File:Constant_Moderato_(Short).ogg</a></audio>

        <a href="https://static.wikia.nocookie.net/blue-archive/images/8/8e/Constant_Moderato_%28Short%29.ogg/revision/latest?cb=20211122134548">Test Link</a>
        <ul className="list-none grid gap-5">
          {/* {data.map((result) => {
            return (
              <li key={result["id"]} className="flex justify-around">
                <audio src={result["src"]} controls>
               
                </audio>
                <form onSubmit={downloadHandler}>
                  <input type="hidden" name="link" value={result["src"]} />
                  <button
                    type="submit"
                    className="p-2 border border-2 rounded-lg "
                  >
                    Download
                  </button>
                </form>
              </li>
            );
          })} */}
        </ul>
      </div>
    );
  } else {
    return <h1>ERROOOR MISSING</h1>;
  }
};

export default Results;
