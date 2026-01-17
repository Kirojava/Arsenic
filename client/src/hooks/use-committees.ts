import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type Committee } from "@shared/schema";

export function useCommittees() {
  return useQuery({
    queryKey: [api.committees.list.path],
    queryFn: async () => {
      const res = await fetch(api.committees.list.path);
      if (!res.ok) throw new Error("Failed to fetch committees");
      return api.committees.list.responses[200].parse(await res.json());
    },
  });
}

export function useCommittee(id: number) {
  return useQuery({
    queryKey: [api.committees.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.committees.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch committee");
      return api.committees.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
