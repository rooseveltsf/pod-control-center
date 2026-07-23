import type { Appointment, CreateAppointmentInput, Episode, Pod } from "@pod-control-center/types";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:3100";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(body?.error?.message ?? "Não foi possível comunicar com a API local.");
  }

  return response.json() as Promise<T>;
}

export const api = {
  listPods: () => request<Pod[]>("/pods"),
  listAppointments: () => request<Appointment[]>("/appointments"),
  listEpisodes: () => request<Episode[]>("/episodes"),
  createAppointment: (input: CreateAppointmentInput) =>
    request<Appointment>("/appointments", { method: "POST", body: JSON.stringify(input) }),
};
