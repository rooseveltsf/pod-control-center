import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link } from 'react-router-dom'
import './styles.css'

type PodStatus = 'Ao vivo' | 'Em preparação' | 'Offline'
const pods: { name: string; status: PodStatus; detail: string; accent: string }[] = [
  { name: 'Pod 01', status: 'Ao vivo', detail: 'Há 42 min', accent: 'bg-emerald-400' },
  { name: 'Pod 02', status: 'Em preparação', detail: 'Cena: Entrevista', accent: 'bg-amber-300' },
  { name: 'Pod 03', status: 'Offline', detail: 'Última atividade 09:17', accent: 'bg-slate-500' }
]
const statusStyle: Record<PodStatus, string> = {
  'Ao vivo': 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  'Em preparação': 'bg-amber-300/10 text-amber-200 ring-amber-300/20',
  Offline: 'bg-slate-400/10 text-slate-300 ring-slate-400/20'
}

function App() {
  return <div className="min-h-screen overflow-hidden bg-[#090b13] text-slate-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(109,94,252,0.16),transparent_28rem),radial-gradient(circle_at_12%_75%,rgba(23,193,155,0.07),transparent_24rem)]" />
    <div className="relative mx-auto flex min-h-screen max-w-[1440px]">
      <aside className="hidden w-64 flex-col border-r border-white/7 bg-white/[0.02] px-5 py-6 lg:flex">
        <div className="mb-12 flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500 text-lg font-black shadow-lg shadow-violet-950/50">P</div><div><p className="text-sm font-bold tracking-tight">Pod Control</p><p className="text-[10px] uppercase tracking-[.18em] text-slate-500">Control center</p></div></div>
        <nav className="space-y-1 text-sm"><a className="flex items-center gap-3 rounded-xl bg-violet-500/15 px-3 py-2.5 font-medium text-violet-200" href="#inicio">⌂ Visão geral</a><a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white" href="#pods">◉ Meus pods <span className="ml-auto rounded-full bg-white/8 px-2 py-0.5 text-xs text-slate-300">3</span></a><a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white" href="#agenda">□ Agenda</a><a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white" href="#midia">▷ Biblioteca</a></nav>
        <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-4"><p className="text-xs font-semibold text-slate-200">Precisa de ajuda?</p><p className="mt-1 text-xs leading-5 text-slate-500">Acesse o guia rápido para configurar seu estúdio.</p><button className="mt-3 text-xs font-semibold text-violet-300">Ver guia →</button></div>
      </aside>
      <main id="inicio" className="flex min-w-0 flex-1 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
        <header className="flex items-center justify-between gap-4"><div className="flex items-center gap-2 lg:hidden"><div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500 font-black">P</div><span className="text-sm font-bold">Pod Control</span></div><p className="hidden text-sm text-slate-500 lg:block">Sábado, 18 de julho</p><div className="ml-auto flex items-center gap-3"><button aria-label="Notificações" className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-300 transition hover:bg-white/8">♧</button><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-500 text-sm font-bold">RS</div></div></header>
        <section className="mt-12 sm:mt-16"><p className="text-sm font-medium text-violet-300">Bom dia, Roose</p><div className="mt-2 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Tudo sob controle.</h1><p className="mt-2 text-sm text-slate-400 sm:text-base">Seu estúdio está pronto para mais uma produção.</p></div><Link to="/novo-pod" className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-400">+ Novo agendamento</Link></div></section>
        <section className="mt-9 grid gap-4 sm:grid-cols-3">{[['3', 'pods configurados', 'bg-violet-400'], ['1', 'transmissão ao vivo', 'bg-emerald-400'], ['2', 'sessões hoje', 'bg-amber-300']].map(([value, label, color]) => <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5"><div className={`h-1.5 w-8 rounded-full ${color}`} /><p className="mt-5 text-3xl font-semibold text-white">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</section>
        <section id="pods" className="mt-10"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-white">Seus pods</h2><p className="mt-1 text-sm text-slate-500">Acompanhe o status dos seus estúdios.</p></div><a href="#todos" className="text-sm font-semibold text-violet-300 hover:text-violet-200">Ver todos</a></div><div className="mt-4 grid gap-3 xl:grid-cols-3">{pods.map((pod) => <article key={pod.name} className="group rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.045]"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`h-2.5 w-2.5 rounded-full ${pod.accent} ${pod.status === 'Ao vivo' ? 'animate-pulse' : ''}`} /><h3 className="font-semibold text-white">{pod.name}</h3></div><button aria-label={`Opções do ${pod.name}`} className="text-slate-500 hover:text-white">•••</button></div><p className="mt-6 text-sm text-slate-400">{pod.detail}</p><span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyle[pod.status]}`}>{pod.status}</span></article>)}</div></section>
        <section id="agenda" className="mb-4 mt-10 rounded-2xl border border-white/8 bg-gradient-to-r from-white/[0.04] to-violet-500/[0.06] p-5 sm:flex sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-violet-300">Próxima sessão</p><h2 className="mt-2 text-lg font-semibold text-white">Podcast Mesa 12 · 14:00</h2><p className="mt-1 text-sm text-slate-400">Pod 02 · 2 participantes confirmados</p></div><button className="mt-4 rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.1] sm:mt-0">Abrir sessão</button></section>
      </main>
    </div>
  </div>
}
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><App /></HashRouter></StrictMode>)
