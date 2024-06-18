import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <div className={`${poppins.className} h-full`}>
      <div className="mx-auto max-w-[1000px] mt-10">
        <div className="bg-white border rounded p-8 flex justify-between  items-end">
          <input type="text" className="border p-1.5" />
          <button className="bg-slate-800 text-white px-4 py-2 rounded text-base">
            Add Activity
          </button>
        </div>

        <table className="table-auto border-collapse border text-center bg-white text-slate-800 my-4 w-full">
          <thead>
            <tr>
              <th className="border py-2">Activity Name</th>
              <th className="border py-2">Start Time</th>
              <th className="border py-2">End Time</th>
              <th className="border py-2">Status</th>
              <th className="border py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-2">Design UI</td>
              <td className="border py-2">jam 12:12</td>
              <td className="border py-2">jam 14:14</td>
              <td className="border py-2">Selesai</td>
              <td className="border py-2">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
