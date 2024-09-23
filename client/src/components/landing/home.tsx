import { validateToken } from "@/lib/validateToken";

export default function Home() {
  validateToken();

  return (<>
    home
  </>)
}
