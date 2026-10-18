import type { Project } from "@/types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Payments Platform",
    slug: "payments-platform",
    isOwner: true,
  },
  { id: "p2", name: "Realtime Chat", slug: "realtime-chat", isOwner: true },
  { id: "p3", name: "Data Pipeline", slug: "data-pipeline", isOwner: false },
];
