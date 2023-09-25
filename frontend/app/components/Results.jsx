"use client";
import { headers } from "@/next.config";
import React, { useCallback, useEffect, useState } from "react";
import getData from "./tools/fetcher";
import downloader from "./tools/downloader";

const Results = ({ searchParams }) => {
  // Get link from parameter
  let { link } = searchParams;
  const [data, setData] = useState([]);

  // Set display
  const [display, setDisplay] = useState("none");
  // Set min counter
  const [min, setMin] = useState(0);
  // Set max counter
  const [max, setMax] = useState(10);

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
      setMax(data.length);
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

  const downloadallHandler = useCallback((e) => {
    e.preventDefault();
    const result = e.target.value.results;

    setDisplay("block");

    async function invoke() {
      for (place of result) {
        link = place["src"];
        filename = place["filename"];
        await downloader(link, filename);
      }
    }
  });

  if (data) {
    return (
      <div className=" p-5 border border-5 rounded-lg">
        <div className="mb-5 ml-auto">
          <form onSubmit={downloadallHandler}>
            <input type="hidden" name="results" value={data} />
            <button className="p-2 border border-2 rounded-lg " type="submit">
              Download All
            </button>
          </form>
          <p>1/4</p>
        </div>
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
