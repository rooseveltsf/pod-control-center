function CardPlanner() {
    return (
        <div className="w-full h-75 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-violet-500/40 hover:bg-zinc-900">
            <div className="flex items-start justify-between">
                <div>
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                        Hoje
                    </span>

                    <h3 className="mt-3 text-lg font-semibold text-white">
                        Podcast com João Silva
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                        Planejamento da live semanal sobre tecnologia.
                    </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Confirmado
                </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-5">
                <div>
                    <p className="text-xs text-zinc-500">Horário</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        20:00 - 22:00
                    </p>
                </div>

                <div>
                    <p className="text-xs text-zinc-500">Convidados</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        2 Pessoas
                    </p>
                </div>

                <div>
                    <p className="text-xs text-zinc-500">Plataforma</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        YouTube
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
                <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800">
                    Editar
                </button>

                <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500">
                    Abrir
                </button>
            </div>
        </div>
    );
}
export default CardPlanner;