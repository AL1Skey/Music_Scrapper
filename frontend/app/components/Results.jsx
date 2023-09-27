"use client";
import { headers } from "@/next.config";
import React, { useCallback, useEffect, useState } from "react";
import getData from "./tools/fetcher";
import downloader from "./tools/downloader";

const Results = ({ searchParams }) => {
  // Get link from parameter
  const { link } = searchParams;
  const [data, setData] = useState([]);

  // Set display
  const [display, setDisplay] = useState("none");
  // Set min counter
  const [min, setMin] = useState(0);
  // Set max counter
  const [max, setMax] = useState(10);
  // Set bar
  const [bar, setBar] = useState(0);

  //Do this function once
  useEffect(() => {
    try {
      const api = process.env.NEXT_PUBLIC_API_HOST_RESULTS;
      // Create async function as workaround to promise
      // If I not do it, next will fetching twice every render
      async function invoke() {
        const output = await getData(link, "" + api);

        setData(output);

        let count = 0;
        output.forEach((some) => {
          count++;
        });
        setMax(count);

        //
        //
      }
      // If data is empty
      if (!data.length) {
        invoke();
      }
    } catch (error) {
      return (
        <>
          <h1>{error}</h1>
        </>
      );
    }
  });

  const downloadHandler = useCallback((e) => {
    e.preventDefault();

    const filename = e.target.filename.value;
    const urlink = e.target.link.value;
    async function invoke() {
      await downloader(urlink, filename);
    }

    invoke();
  });

  const downloadallHandler = useCallback((e) => {
    e.preventDefault();

    const result = JSON.parse(e.target.results.value);

    setDisplay("block");

    async function invoke() {
      let count = 1;
      for (let place of result) {
        let urlink = place["src"];
        let filename = place["id"] + " " + place["filename"];
        await downloader(urlink, filename);
        setMin(count);
        setBar((count / max) * 100);
        count++;
      }
    }

    invoke();
  });

  if (data) {
    try {
      return (
        <div className=" p-5 border border-5 rounded-lg">
          <div className="mb-5 ml-auto">
            <form onSubmit={downloadallHandler}>
              <input
                type="hidden"
                name="results"
                value={JSON.stringify(data)}
              />
              <button className="p-2 border border-2 rounded-lg " type="submit">
                Download All
              </button>
            </form>
            <div className="mt-5 w-1/6 h-full border border-1 rounded-lg">
              <div
                className="h-full bg-blue-600 rounded-lg"
                style={{ width: bar + "%" }}
              >
                <p className="text-center">
                  {min}/{max}
                </p>
              </div>
            </div>
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
                      value={result["id"] + " " + result["filename"]}
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
    } catch (error) {
      return <h1>{error}</h1>;
    }
  } else {
    return <h1>ERROOOR MISSING</h1>;
  }
};

export default Results;
