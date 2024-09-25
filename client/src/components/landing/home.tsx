import { validateToken } from "@/lib/validateToken";
import axios from "axios";

export default function Home() {
  validateToken();

  axios.post((import.meta.env.VITE_API_URL+'/connect_streanger'), {
    
  })

  return (<>
    home
  </>)
}


