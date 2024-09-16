import Editbox from "./_components/editbox";
import Sidebar from "./_components/sidebar";

export default function Home() {
  return (
    <div className=" max-w-7xl m-auto w-full lg:h-screen grid grid-cols-4">
      <div className="h-full col-span-1 p-3">
        <Sidebar />
      </div>
      <div className="h-full col-span-3 p-3">
        <Editbox />
      </div>
    </div>
  );
}
