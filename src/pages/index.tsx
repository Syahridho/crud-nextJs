import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <div className={`${poppins.className} h-full`}>
      <div>
        <h1>asd</h1>
      </div>
    </div>
  );
}
