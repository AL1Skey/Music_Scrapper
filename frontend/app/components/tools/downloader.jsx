export default async function downloader(link, filename) {
  try {
    const download = await fetch(link);
    // (api,{
    //   method:"POST",
    //   mode:"cors",
    //   headers:{
    //     "Content-Type":"application/octet-stream"
    //   },
    //   body:JSON.stringify({"link":link})
    // }).catch((error)=>{
    //   console.error(error)
    // })

    if (download.ok) {
      // Handle downloaded object as binary
      const downloaded = await download.blob();
      console.log("download", downloaded);

      // Create Temporary Url from localstorage
      const dURL = URL.createObjectURL(downloaded);

      // Create anchor element
      const a = document.createElement("a");
      a.href = dURL;
      a.download = filename;

      // Start download
      a.click();

      //  Remove temporary URL
      URL.revokeObjectURL(dURL);
    } else {
      throw new Error(`Request failed with status ${download.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
