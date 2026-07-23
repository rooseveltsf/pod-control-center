import { Link } from "react-router-dom";
import { paths } from "../routes";

export default function NotFoundPage() {
  return (
    <main className="app-page page-transition grid min-h-screen place-items-center overflow-hidden bg-[#1b2055] px-5 text-center text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(143,163,240,0.2),transparent_25rem)]" />

      <section className="relative max-w-md">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-violet-500/15 text-2xl font-bold text-violet-200 ring-1 ring-inset ring-violet-400/20">
          ?
        </div>
        <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-violet-300">
          ERRO 404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Esta página não existe.
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
          O endereço acessado não foi encontrado no Pod Control Center.
        </p>
        <Link
          to={paths.home}
          className="mt-8 inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition hover:bg-violet-400"
        >
          Voltar para a visão geral
        </Link>
      </section>
    </main>
  );
}
