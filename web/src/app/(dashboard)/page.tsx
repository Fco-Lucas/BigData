import { Suspense } from "react"
import DashboardClientPage from "./dashboard-client-page";

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <DashboardClientPage />
    </Suspense>
  );
}
