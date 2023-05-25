import ClassSchedule from "../class schedule/ClassSchedule";
import RenderTable from "../class schedule/RenderTable";
import Notification from "../notification/Notification";

function ClassPage() {
  return (
    <div className="w-4 p-0 m-0 flex">
      <ClassSchedule />
      <RenderTable />
      <Notification />
    </div>
  );
}

export default ClassPage;
