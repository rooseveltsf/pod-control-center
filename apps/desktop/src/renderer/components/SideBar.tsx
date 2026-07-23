import { NavLink } from "react-router-dom";
import { paths } from "../src/routes";

function SideBar() {
    return (
        <>
            <aside className="app-sidebar fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/7 bg-white/[0.02] px-5 py-6 lg:flex">
                <div className="mb-12 flex items-center gap-3 px-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500 text-lg font-black shadow-lg shadow-violet-950/50">
                        P
                    </div>
                    <div>
                        <p className="text-sm font-bold tracking-tight">Pod Control</p>
                        <p className="text-[10px] uppercase tracking-[.18em] text-slate-500">
                            Control center
                        </p>
                    </div>
                </div>
                <nav className="space-y-1 text-sm">
                    <NavLink
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "rgba(83, 105, 201, 0.20)" : "transparent",
                        })}
                        className={({ isActive }) => "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-violet-200 transition hover:bg-white/5 hover:text-white active:bg-violet-500/20" + (isActive ? " bg-violet-500/15" : "")}
                        to={paths.home}
                    >
                        🏠 Visão geral
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => "flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white" + (isActive ? " bg-violet-500/15" : "")}
                        to={paths.myPods}
                    >
                        ◉ Meus pods{" "}
                        <span className="ml-auto rounded-full bg-white/8 px-2 py-0.5 text-xs text-slate-300">
                            3
                        </span>
                    </NavLink>
                    <NavLink
                        to={paths.planner}
                        aria-label="Agenda"
                        title="Agenda"
                        className={({ isActive }) => "flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white" + (isActive ? " bg-violet-500/15" : "")}
                    >
                        📔​ Agenda
                    </NavLink>
                </nav>
                <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold text-slate-200">
                        Precisa de ajuda?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Acesse o guia rápido para configurar seu estúdio.
                    </p>
                    <button className="mt-3 text-xs font-semibold text-violet-300">
                        Ver guia →
                    </button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
