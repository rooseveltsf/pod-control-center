import { Link } from "react-router-dom";
import { paths } from "../routes";

type EpisodeStatus = "Publicado" | "Rascunho" | "Agendado";

const episodes: {
  title: string;
  number: string;
  date: string;
  duration: string;
  status: EpisodeStatus;
}[] = [
  {
    title: "Como criar conversas que conectam",
    number: "EP. 24",
    date: "18 jul 2026",
    duration: "48 min",
    status: "Publicado",
  },
  {
    title: "O futuro da criação independente",
    number: "EP. 25",
    date: "21 jul 2026",
    duration: "52 min",
    status: "Agendado",
  },
  {
    title: "Bastidores de uma boa entrevista",
    number: "EP. 26",
    date: "Sem data",
    duration: "—",
    status: "Rascunho",
  },
];

const statusStyles: Record<EpisodeStatus, string> = {
  Publicado: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  Agendado: "bg-violet-400/10 text-violet-200 ring-violet-400/20",
  Rascunho: "bg-slate-400/10 text-slate-300 ring-slate-400/20",
};

export default function MyPodsPage() {
  return (
    <div className="page-transition min-h-screen overflow-hidden bg-[#090b13] px-5 py-6 text-slate-100 sm:px-8 lg:px-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(109,94,252,0.16),transparent_28rem),radial-gradient(circle_at_12%_75%,rgba(23,193,155,0.07),transparent_24rem)]" />

      <main className="relative mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-white/8 pb-6">
          <Link
            to={paths.home}
            className="flex items-center gap-3 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-lg">
              ←
            </span>
            Voltar para a visão geral
          </Link>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-500 text-sm font-bold">
            RS
          </div>
        </header>

        <section className="mt-12">
          <p className="text-sm font-medium text-violet-300">Biblioteca</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Meus pods
              </h1>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Todos os episódios do seu podcast em um só lugar.
              </p>
            </div>
            <button className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-400">
              + Novo episódio
            </button>
          </div>
        </section>

        <section className="mt-9 rounded-2xl border border-white/8 bg-white/[0.035] p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-1 pb-4">
            <div className="flex gap-1 rounded-xl bg-[#0d101b] p-1 text-sm">
              <button className="rounded-lg bg-violet-500/20 px-3 py-2 font-medium text-violet-200">
                Todos <span className="ml-1 text-violet-300">3</span>
              </button>
              <button className="rounded-lg px-3 py-2 text-slate-400 transition hover:text-white">
                Publicados
              </button>
              <button className="rounded-lg px-3 py-2 text-slate-400 transition hover:text-white">
                Rascunhos
              </button>
            </div>
            <input
              aria-label="Buscar episódios"
              placeholder="Buscar episódio"
              className="w-full rounded-xl border border-white/10 bg-[#0d101b] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400 sm:w-48"
            />
          </div>

          <div className="divide-y divide-white/8">
            {episodes.map((episode) => (
              <article
                key={episode.number}
                className="flex flex-wrap items-center gap-x-5 gap-y-3 px-2 py-5 transition hover:bg-white/[0.025] sm:px-3"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/10 text-xs font-semibold text-violet-200">
                  {episode.number}
                </div>
                <div className="min-w-[12rem] flex-1">
                  <h2 className="font-medium text-white">{episode.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {episode.date} · {episode.duration}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[episode.status]}`}
                >
                  {episode.status}
                </span>
                <button
                  aria-label={`Mais opções para ${episode.title}`}
                  className="rounded-lg px-2 py-1 text-slate-500 transition hover:bg-white/5 hover:text-white"
                >
                  •••
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
