import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertRegistration } from "@shared/schema";

// Create Registration
export function useCreateRegistration() {
  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to register");
      }
      return api.registrations.create.responses[201].parse(await res.json());
    },
  });
}

// List Registrations (Admin)
export function useRegistrations() {
  return useQuery({
    queryKey: [api.registrations.list.path],
    queryFn: async () => {
      const res = await fetch(api.registrations.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch registrations");
      return api.registrations.list.responses[200].parse(await res.json());
    },
  });
}

// Verify Code (Admin)
export function useVerifyRegistration() {
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch(api.registrations.verify.path, {
        method: api.registrations.verify.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Invalid code");
        throw new Error("Failed to verify");
      }
      return api.registrations.verify.responses[200].parse(await res.json());
    },
  });
}

// Update Registration (Admin)
export function useUpdateRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<InsertRegistration>) => {
      const url = buildUrl(api.registrations.update.path, { id });
      const res = await fetch(url, {
        method: api.registrations.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to update registration");
      return api.registrations.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.registrations.list.path] });
    },
  });
}
