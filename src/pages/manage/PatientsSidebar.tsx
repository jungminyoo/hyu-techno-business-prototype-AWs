import { NavLink } from "react-router";
import { patients } from "../../datas/patientsData";
import logoImage from "../../assets/img/152a15a6bf3756c63c9f5b2effa70bc6.png";

function PatientsSidebar() {
  return (
    <aside className="relative w-56 border-r border-slate-200 bg-white p-4 overflow-hidden ">
      <img
        src={logoImage}
        alt="Logo"
        className="absolute top-4 left-4 w-8 h-8 object-contain"
      />
      <h2 className="mt-10  mb-3 text-sm font-semibold text-slate-900">Patients</h2>
      <nav className="flex flex-col gap-2 overflow-auto max-h-[calc(100vh-10rem)] pr-1 no-scrollbar">
        {patients.map((patient) => (
          <NavLink
            key={patient.patientId}
            to={`/manage/${patient.patientId}`}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            {patient.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default PatientsSidebar;
