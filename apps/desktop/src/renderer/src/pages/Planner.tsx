import CardPlanner from "../../components/CardPlanner";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import type { Appointment } from "@pod-control-center/types";
import { api } from "../api";

function PlannerPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [error, setError] = useState("");
    useEffect(() => { api.listAppointments().then(setAppointments).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar a agenda.")); }, []);
    return (
        <div className="app-page page-transition min-h-screen overflow-hidden bg-[#1b2055] text-slate-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(143,163,240,0.18),transparent_28rem),radial-gradient(circle_at_12%_75%,rgba(83,105,201,0.12),transparent_24rem)]" />
            <div className="relative flex min-h-screen">
                <SideBar />
                <main
                    className="min-w-0 flex-1 px-5 py-5 sm:px-8 sm:py-7 lg:ml-64 lg:px-10"
                >
                    <Header />
                    <section className="mt-10 sm:mt-14">
                        <p className="text-sm font-medium text-violet-300">Agenda</p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Próximas gravações
                        </h1>
                        <p className="mt-2 text-sm text-slate-400 sm:text-base">
                            Acompanhe e prepare as sessões do seu estúdio.
                        </p>
                    </section>

                    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {appointments.map((appointment) => <CardPlanner key={appointment.id} appointment={appointment} />)}
                    </section>
                    {error && <p className="mt-6 text-sm text-rose-300">API local indisponível: {error}</p>}
                    {!error && appointments.length === 0 && <p className="mt-6 text-sm text-slate-400">Nenhum agendamento encontrado.</p>}
                </main>
            </div>
        </div>
    );
}

export default PlannerPage;
