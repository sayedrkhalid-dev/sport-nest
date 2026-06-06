"use client";

import AddFacilityModal from "@/components/UI/AddFacilityModal/AddFacilityModal";
import PrivateRoute from "@/components/UI/PrivateRoute/PrivateRoute";
import { useRouter } from "next/navigation";

export default function AddFacilityPage() {
  const router = useRouter();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between relative overflow-hidden">
        <main className="flex-1 pt-24 pb-16 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full filter blur-[2px] opacity-30 select-none pointer-events-none">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
                Host Analytics
              </span>
              <h1 className="text-headline-lg font-extrabold text-on-surface dark:text-white text-3xl md:text-4xl font-display">
                Manage My Facilities
              </h1>
            </div>
          </div>
        </main>

        <AddFacilityModal
          isOpen={true}
          onClose={() => router.push("/manage-my-facilities")}
          onSuccess={() => {
            router.push("/manage-my-facilities");
          }}
        />
      </div>
    </PrivateRoute>
  );
}
