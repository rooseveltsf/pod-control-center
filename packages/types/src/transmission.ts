import type { EntityId, IsoDateTime, OperationError, Timestamps } from "./common.js";

export type TransmissionPlatform = "obs" | "youtube" | "custom";

export type TransmissionStatus =
  | "idle"
  | "preparing"
  | "live"
  | "paused"
  | "ended"
  | "error";

/** O estado de uma transmissão associada a um pod e, opcionalmente, a um episódio. */
export interface Transmission extends Timestamps {
  id: EntityId;
  podId: EntityId;
  episodeId?: EntityId;
  platform: TransmissionPlatform;
  status: TransmissionStatus;
  externalStreamId?: string;
  streamUrl?: string;
  startedAt?: IsoDateTime;
  endedAt?: IsoDateTime;
  viewerCount?: number;
  error?: OperationError;
}

export interface StartTransmissionInput {
  podId: EntityId;
  episodeId?: EntityId;
  platform: TransmissionPlatform;
}

export interface UpdateTransmissionInput {
  status?: TransmissionStatus;
  externalStreamId?: string;
  streamUrl?: string;
  startedAt?: IsoDateTime;
  endedAt?: IsoDateTime;
  viewerCount?: number;
  error?: OperationError;
}
