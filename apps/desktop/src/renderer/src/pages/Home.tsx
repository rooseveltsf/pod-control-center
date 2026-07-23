import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Appointment, Pod, PodStatus } from "@pod-control-center/types";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { api } from "../api";
import { paths } from "../routes";

const statusLabels: Record<PodStatus, string> = {
  offline: "Offline", preparing: "Em preparação", available: "Disponível", recording: "Gravando",
  live: "Ao vivo", maintenance: "Em manutenção", error: "Erro",
};
const statusStyle: Record<PodStatus, string> = {
  offline: "bg-slate-400/10 text-slate-300 ring-slate-400/20", preparing: "bg-amber-300/10 text-amber-200 ring-amber-300/20",
  available: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20", recording: "bg-rose-400/10 text-rose-200 ring-rose-400/20",
  live: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20", maintenance: "bg-amber-300/10 text-amber-200 ring-amber-300/20", error: "bg-rose-400/10 text-rose-200 ring-rose-400/20",
};
const dotStyle: Record<PodStatus, string> = { offline: "bg-slate-500", preparing: "bg-amber-300", available: "bg-emerald-400", recording: "bg-rose-400", live: "bg-emerald-400", maintenance: "bg-amber-300", error: "bg-rose-400" };

export default function HomePage() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.listPods(), api.listAppointments()])
      .then(([loadedPods, loadedAppointments]) => { setPods(loadedPods); setAppointments(loadedAppointments); })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar os dados."));
  }, []);

  const nextAppointment = appointments.filter((item) => new Date(item.startsAt) > new Date()).sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
  const livePods = pods.filter((pod) => pod.status === "live").length;

  return <div className="app-page page-transition min-h-screen overflow-hidden bg-[#1b2055] text-slate-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(143,163,240,0.18),transparent_28rem),radial-gradient(circle_at_12%_75%,rgba(83,105,201,0.12),transparent_24rem)]" />
    <div className="relative flex min-h-screen w-full"><SideBar />
      <main id="inicio" className="flex min-w-0 flex-1 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:ml-64 lg:px-10"><Header />
        <section className="mt-12 sm:mt-16"><p className="text-sm font-medium text-violet-300">Bom dia, Roose</p><div className="mt-2 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Tudo sob controle.</h1><p className="mt-2 text-sm text-slate-400 sm:text-base">Acompanhe a operação do seu estúdio em tempo real.</p></div><Link to={paths.newAppointment} className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-400">+ Novo agendamento</Link></div></section>
        {error && <p className="mt-6 rounded-xl bg-rose-400/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-inset ring-rose-400/20">API local indisponível: {error}</p>}
        <section className="mt-9 grid gap-4 sm:grid-cols-3">{[[String(pods.length), "pods configurados", "bg-violet-400"], [String(livePods), "transmissões ao vivo", "bg-emerald-400"], [String(appointments.length), "sessões agendadas", "bg-amber-300"]].map(([value, label, color]) => <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5"><div className={`h-1.5 w-8 rounded-full ${color}`} /><p className="mt-5 text-3xl font-semibold text-white">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</section>
        <section id="pods" className="mt-10"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">Seus pods</h2><p className="mt-1 text-sm text-slate-500">Dados carregados da API local.</p></div><Link to={paths.myPods} className="text-sm font-semibold text-violet-300 hover:text-violet-200">Ver todos</Link></div><div className="mt-4 grid gap-3 xl:grid-cols-3">{pods.map((pod) => <article key={pod.id} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`h-2.5 w-2.5 rounded-full ${dotStyle[pod.status]} ${pod.status === "live" ? "animate-pulse" : ""}`} /><h3 className="font-semibold text-white">{pod.name}</h3></div></div><p className="mt-6 text-sm text-slate-400">{pod.description ?? "Sem descrição"}</p><span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyle[pod.status]}`}>{statusLabels[pod.status]}</span></article>)}</div></section>
        <section className="mb-4 mt-10 rounded-2xl border border-white/8 bg-gradient-to-r from-white/[0.04] to-violet-500/[0.06] p-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-violet-300">Próxima sessão</p>{nextAppointment ? <><h2 className="mt-2 text-lg font-semibold text-white">{nextAppointment.title} · {new Date(nextAppointment.startsAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</h2><p className="mt-1 text-sm text-slate-400">{nextAppointment.participantCount} participantes confirmados</p></> : <p className="mt-2 text-sm text-slate-400">Nenhuma sessão futura agendada.</p>}</section>
      </main>
    </div>
  </div>;
}
