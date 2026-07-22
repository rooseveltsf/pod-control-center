function Header() {
    return (
        <header className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500 font-black">
                    P
                </div>
                <span className="text-sm font-bold">Pod Control</span>
            </div>
            <p className="hidden text-sm text-slate-500 lg:block">
                Sábado, 18 de julho
            </p>
            <div className="ml-auto flex items-center gap-3">
                <button
                    aria-label="Notificações"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-300 transition hover:bg-white/8"
                >
                    ♧
                </button>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-500 text-sm font-bold">
                    RS
                </div>
            </div>
        </header>
    )
}

export default Header;