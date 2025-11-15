import { z } from "zod";

export const dashboardFilterSchema = z.object({
  country: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export type DashboardFilterSchema = z.infer<typeof dashboardFilterSchema>;