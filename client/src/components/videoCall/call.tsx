import { useParams } from "react-router-dom";
import Header from "../pages/header";
import SoloCall from "./call/solocall";

export default function Call() {
	const {duoId, duoName} = useParams();
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />
	  <div className="flex-1 flex p-6 space-x-6">
	  {duoId && duoName && }
        <SoloCall />
	  </div>
    </div>
  );
}
