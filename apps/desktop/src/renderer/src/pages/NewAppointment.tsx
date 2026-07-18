import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../routes";

const pods = ["Pod 01", "Pod 02", "Pod 03"];

export default function NewAppointmentPage() {
  const [isSaved, setIsSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaved(true);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#090b13] px-5 py-6 text-slate-100 sm:px-8 lg:px-10">
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

        <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <p className="text-sm font-medium text-violet-300">Agenda</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Novo agendamento
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Reserve um pod e deixe sua próxima produção organizada.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-white/8 bg-white/[0.035] p-5 sm:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="text-sm font-medium text-slate-200">
                    Nome da produção
                  </span>
                  <input
                    required
                    placeholder="Ex.: Podcast Mesa 12"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
                <label>
                  <span className="text-sm font-medium text-slate-200">
                    Pod
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10">
                    {pods.map((pod) => (
                      <option key={pod}>{pod}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-sm font-medium text-slate-200">
                    Data
                  </span>
                  <input
                    required
                    type="date"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
                <label>
                  <span className="text-sm font-medium text-slate-200">
                    Horário de início
                  </span>
                  <input
                    required
                    type="time"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
                <label>
                  <span className="text-sm font-medium text-slate-200">
                    Duração estimada
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10">
                    <option>1 hora</option>
                    <option>2 horas</option>
                    <option>3 horas</option>
                    <option>4 horas</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="text-sm font-medium text-slate-200">
                    Observações{" "}
                    <span className="text-slate-500">(opcional)</span>
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Participantes, necessidades técnicas ou informações relevantes."
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0d101b] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
              </div>

              {isSaved && (
                <p className="mt-5 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
                  Agendamento criado com sucesso.
                </p>
              )}

              <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-white/8 pt-5">
                <Link
                  to={paths.home}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-400"
                >
                  Criar agendamento
                </button>
              </div>
            </form>
          </div>

          <aside className="h-fit rounded-2xl border border-violet-400/15 bg-violet-500/[0.07] p-5">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-violet-300">
              Disponibilidade
            </p>
            <h2 className="mt-3 text-lg font-semibold text-white">
              Seu estúdio funciona até 22h.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Confirme a disponibilidade do pod antes de compartilhar o convite
              com os participantes.
            </p>
            <div className="mt-5 space-y-3 border-t border-white/8 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Pod 01</span>
                <span className="font-medium text-emerald-300">Disponível</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pod 02</span>
                <span className="font-medium text-amber-200">
                  Ocupado às 14h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pod 03</span>
                <span className="font-medium text-emerald-300">Disponível</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
