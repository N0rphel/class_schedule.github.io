import RenderTable from "./RenderTable";

const ClassTable = () => {
  return (
    <div className="w-full mt-[110px] p-0">
      <h1 className="text-gray-900 text-2xl font-bold px-4">
        class Schedule - 2IT
      </h1>
      <h1 className="text-gray-800 text-lg font-bold px-4">CR-16</h1>
      <RenderTable />
    </div>
  );
};

export default ClassTable;
