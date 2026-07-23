import { randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type {
  Appointment,
  AppointmentStatus,
  Episode,
  EpisodeStatus,
  Pod,
  PodStatus,
  Transmission,
  TransmissionPlatform,
  TransmissionStatus,
} from "@pod-control-center/types";
import { LocalStore } from "./store.js";

type JsonRecord = Record<string, unknown>;
type ResourceName = "pods" | "appointments" | "episodes" | "transmissions";
type Resource = Pod | Appointment | Episode | Transmission;

const podStatuses = new Set<PodStatus>(["offline", "preparing", "available", "recording", "live", "maintenance", "error"]);
const appointmentStatuses = new Set<AppointmentStatus>(["scheduled", "confirmed", "in_progress", "completed", "cancelled"]);
const episodeStatuses = new Set<EpisodeStatus>(["draft", "scheduled", "recording", "editing", "publishing", "published", "failed"]);
const transmissionStatuses = new Set<TransmissionStatus>(["idle", "preparing", "live", "paused", "ended", "error"]);
const transmissionPlatforms = new Set<TransmissionPlatform>(["obs", "youtube", "custom"]);

export function createApiServer(store: LocalStore) {
  return createServer(async (request, response) => {
    try {
      await handleRequest(store, request, response);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof Error ? error.message : "Erro interno do servidor.";
      sendJson(response, status, { error: { message } });
    }
  });
}

async function handleRequest(store: LocalStore, request: IncomingMessage, response: ServerResponse): Promise<void> {
  setCorsHeaders(response);
  if (request.method === "OPTIONS") {
    response.writeHead(204).end();
    return;
  }

  const url = new URL(request.url ?? "/", "http://localhost");
  const segments = url.pathname.split("/").filter(Boolean);

  if (request.method === "GET" && url.pathname === "/health") {
    return sendJson(response, 200, { status: "ok", storage: "local-json" });
  }

  const [resourceName, id] = segments;
  if (!isResourceName(resourceName)) throw new HttpError(404, "Rota não encontrada.");

  if (request.method === "GET" && !id) return sendJson(response, 200, store.data[resourceName]);
  if (request.method === "GET" && id) return sendJson(response, 200, findResource(store, resourceName, id));

  if (request.method === "POST" && !id) {
    const resource = createResource(store, resourceName, await readJsonBody(request));
    store.data[resourceName].push(resource as never);
    await store.save();
    return sendJson(response, 201, resource);
  }

  if (request.method === "PATCH" && id) {
    const resource = updateResource(store, resourceName, id, await readJsonBody(request));
    await store.save();
    return sendJson(response, 200, resource);
  }

  if (request.method === "DELETE" && id) {
    const items = store.data[resourceName] as Resource[];
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new HttpError(404, "Recurso não encontrado.");
    const [deleted] = items.splice(index, 1);
    await store.save();
    return sendJson(response, 200, deleted);
  }

  throw new HttpError(405, "Método não permitido.");
}

function createResource(store: LocalStore, resourceName: ResourceName, input: JsonRecord): Resource {
  const timestamp = new Date().toISOString();
  const id = randomUUID();

  switch (resourceName) {
    case "pods":
      return {
        id,
        name: requiredString(input, "name"),
        description: optionalString(input, "description"),
        status: "available",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    case "appointments": {
      const appointment = {
        id,
        podId: requiredPodId(store, input),
        title: requiredString(input, "title"),
        notes: optionalString(input, "notes"),
        status: "scheduled" as const,
        startsAt: requiredDate(input, "startsAt"),
        endsAt: requiredDate(input, "endsAt"),
        participantCount: optionalNonNegativeInteger(input, "participantCount") ?? 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      assertPeriod(appointment.startsAt, appointment.endsAt);
      return appointment;
    }
    case "episodes":
      return {
        id,
        podId: requiredPodId(store, input),
        appointmentId: optionalExistingId(store.data.appointments, input, "appointmentId"),
        title: requiredString(input, "title"),
        description: optionalString(input, "description"),
        status: "draft",
        scheduledFor: optionalDate(input, "scheduledFor"),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    case "transmissions":
      return {
        id,
        podId: requiredPodId(store, input),
        episodeId: optionalExistingId(store.data.episodes, input, "episodeId"),
        platform: requiredEnum(input, "platform", transmissionPlatforms),
        status: "idle",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
  }
}

function updateResource(store: LocalStore, resourceName: ResourceName, id: string, input: JsonRecord): Resource {
  const resource = findResource(store, resourceName, id);
  const updatedAt = new Date().toISOString();

  switch (resourceName) {
    case "pods": {
      const pod = resource as Pod;
      return Object.assign(pod, {
        name: optionalString(input, "name") ?? pod.name,
        description: optionalString(input, "description") ?? pod.description,
        status: optionalEnum(input, "status", podStatuses) ?? pod.status,
        lastActivityAt: optionalDate(input, "lastActivityAt") ?? pod.lastActivityAt,
        updatedAt,
      });
    }
    case "appointments": {
      const appointment = resource as Appointment;
      const startsAt = optionalDate(input, "startsAt") ?? appointment.startsAt;
      const endsAt = optionalDate(input, "endsAt") ?? appointment.endsAt;
      assertPeriod(startsAt, endsAt);
      return Object.assign(appointment, {
        podId: optionalPodId(store, input) ?? appointment.podId,
        title: optionalString(input, "title") ?? appointment.title,
        notes: optionalString(input, "notes") ?? appointment.notes,
        status: optionalEnum(input, "status", appointmentStatuses) ?? appointment.status,
        startsAt,
        endsAt,
        participantCount: optionalNonNegativeInteger(input, "participantCount") ?? appointment.participantCount,
        updatedAt,
      });
    }
    case "episodes": {
      const episode = resource as Episode;
      return Object.assign(episode, {
        title: optionalString(input, "title") ?? episode.title,
        description: optionalString(input, "description") ?? episode.description,
        status: optionalEnum(input, "status", episodeStatuses) ?? episode.status,
        scheduledFor: optionalDate(input, "scheduledFor") ?? episode.scheduledFor,
        publishedAt: optionalDate(input, "publishedAt") ?? episode.publishedAt,
        durationSeconds: optionalNonNegativeInteger(input, "durationSeconds") ?? episode.durationSeconds,
        youtubeVideoId: optionalString(input, "youtubeVideoId") ?? episode.youtubeVideoId,
        updatedAt,
      });
    }
    case "transmissions": {
      const transmission = resource as Transmission;
      return Object.assign(transmission, {
        status: optionalEnum(input, "status", transmissionStatuses) ?? transmission.status,
        externalStreamId: optionalString(input, "externalStreamId") ?? transmission.externalStreamId,
        streamUrl: optionalString(input, "streamUrl") ?? transmission.streamUrl,
        startedAt: optionalDate(input, "startedAt") ?? transmission.startedAt,
        endedAt: optionalDate(input, "endedAt") ?? transmission.endedAt,
        viewerCount: optionalNonNegativeInteger(input, "viewerCount") ?? transmission.viewerCount,
        updatedAt,
      });
    }
  }
}

function findResource(store: LocalStore, resourceName: ResourceName, id: string): Resource {
  const resource = (store.data[resourceName] as Resource[]).find((item) => item.id === id);
  if (!resource) throw new HttpError(404, "Recurso não encontrado.");
  return resource;
}

function requiredPodId(store: LocalStore, input: JsonRecord): string {
  return optionalPodId(store, input) ?? requiredString(input, "podId");
}

function optionalPodId(store: LocalStore, input: JsonRecord): string | undefined {
  const podId = optionalString(input, "podId");
  if (podId && !store.data.pods.some((pod) => pod.id === podId)) throw new HttpError(400, "Pod não encontrado.");
  return podId;
}

function optionalExistingId<T extends { id: string }>(items: T[], input: JsonRecord, property: string): string | undefined {
  const id = optionalString(input, property);
  if (id && !items.some((item) => item.id === id)) throw new HttpError(400, `${property} não encontrado.`);
  return id;
}

function requiredString(input: JsonRecord, property: string): string {
  const value = optionalString(input, property);
  if (!value) throw new HttpError(400, `${property} é obrigatório.`);
  return value;
}

function optionalString(input: JsonRecord, property: string): string | undefined {
  const value = input[property];
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new HttpError(400, `${property} deve ser texto.`);
  return value.trim() || undefined;
}

function requiredDate(input: JsonRecord, property: string): string {
  const value = requiredString(input, property);
  if (Number.isNaN(Date.parse(value))) throw new HttpError(400, `${property} deve ser uma data ISO válida.`);
  return value;
}

function optionalDate(input: JsonRecord, property: string): string | undefined {
  const value = optionalString(input, property);
  if (!value) return undefined;
  if (Number.isNaN(Date.parse(value))) throw new HttpError(400, `${property} deve ser uma data ISO válida.`);
  return value;
}

function optionalNonNegativeInteger(input: JsonRecord, property: string): number | undefined {
  const value = input[property];
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new HttpError(400, `${property} deve ser um inteiro não negativo.`);
  }
  return value;
}

function requiredEnum<T extends string>(input: JsonRecord, property: string, values: Set<T>): T {
  const value = optionalEnum(input, property, values);
  if (!value) throw new HttpError(400, `${property} é obrigatório.`);
  return value;
}

function optionalEnum<T extends string>(input: JsonRecord, property: string, values: Set<T>): T | undefined {
  const value = optionalString(input, property);
  if (!value) return undefined;
  if (!values.has(value as T)) throw new HttpError(400, `${property} possui um valor inválido.`);
  return value as T;
}

function assertPeriod(startsAt: string, endsAt: string): void {
  if (Date.parse(endsAt) <= Date.parse(startsAt)) throw new HttpError(400, "endsAt deve ser posterior a startsAt.");
}

async function readJsonBody(request: IncomingMessage): Promise<JsonRecord> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += data.length;
    if (size > 1_000_000) throw new HttpError(413, "Corpo da requisição excede 1 MB.");
    chunks.push(data);
  }
  if (size === 0) return {};
  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error();
    return parsed as JsonRecord;
  } catch {
    throw new HttpError(400, "O corpo deve ser um objeto JSON válido.");
  }
}

function isResourceName(value: string | undefined): value is ResourceName {
  return value === "pods" || value === "appointments" || value === "episodes" || value === "transmissions";
}

function setCorsHeaders(response: ServerResponse): void {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
