import { Suspense } from "react"
import Results from "../components/Results"

function page({searchParams}) {
  return(
    <Suspense fallback={<h1>Loadibng,,,,</h1>}>
      <Results searchParams={searchParams}/>
    </Suspense>
  )
}

export default page