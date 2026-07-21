import CardPlanner from "../../components/CardPlanner";
import SideBar from "../../components/SideBar";

function PlannerPage() {
    return (
        <div className="page-transition relative mx-auto flex min-h-screen max-w-[1440px] overflow-hidden bg-[#090b13] text-slate-100">
            <SideBar />

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 py-5 sm:px-8 sm:py-7 lg:px-10 gap-4">
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
                <CardPlanner />
            </main>
        </div>
    );
}

export default PlannerPage;