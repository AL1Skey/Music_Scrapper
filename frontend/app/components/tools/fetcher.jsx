export default async function getData(link, api) {
  try {
    // DO data processing with api
    const response = await fetch(api, {
      method: "post",
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
