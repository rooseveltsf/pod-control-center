import type { EntityId, IsoDateTime, Timestamps } from "./common.js";

export type PodStatus =
  | "offline"
  | "preparing"
  | "available"
  | "recording"
  | "live"
  | "maintenance"
  | "error";

/** Um estúdio físico ou virtual disponível para produção. */
export interface Pod extends Timestamps {
  id: EntityId;
  name: string;
  description?: string;
  status: PodStatus;
  lastActivityAt?: IsoDateTime;
}

export interface CreatePodInput {
  name: string;
  description?: string;
}

export interface UpdatePodInput {
  name?: string;
  description?: string;
  status?: PodStatus;
}
