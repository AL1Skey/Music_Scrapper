"use client";
import { headers } from "@/next.config";
import React, { useCallback, useEffect, useState } from "react";
import getData from "./tools/fetcher";
import downloader from "./tools/downloader";

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
      console.log("executing invoke");
      setData(output);
      console.log("output:", output);
    }
    // If data is empty
    if (!data.length) {
      invoke();
      console.log("data:", data);
    }
  });

  console.log(data);

  const downloadHandler = useCallback((e) => {
    e.preventDefault();
    console.log(e.target.link.value);

    async function invoke() {
      await downloader(e.target.link.value, e.target.filename.value);
    }

    invoke();

    console.log("downloader invoked");
  });

  if (data) {
    return (
      <div className=" p-5 border border-5 rounded-lg">
        <ul className="list-none grid gap-5">
          {data.map((result) => {
            return (
              <li key={result["id"]} className="flex justify-around">
                <audio controls src={result["src"]} typeof="audio/ogg">
                  <a href={result["href"]}>{result["href"]}</a>
                </audio>
                <form onSubmit={downloadHandler}>
                  <input type="hidden" name="link" value={result["src"]} />
                  <input
                    type="hidden"
                    name="filename"
                    value={result["filename"]}
                  />
                  <button
                    className="p-2 border border-2 rounded-lg "
                    type="submit"
                  >
                    Download
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <h1>ERROOOR MISSING</h1>;
  }
};

export default Results;
