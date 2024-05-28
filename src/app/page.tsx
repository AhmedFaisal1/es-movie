import Image from "next/image";
import Homepage from "./pages/home/page2";
import { SearchProvider } from "./contexts/searchContext";
export default function Home() {
  return (
    <main>
    <SearchProvider>
      <Homepage/>
    </SearchProvider>    
    </main>
  );
}
