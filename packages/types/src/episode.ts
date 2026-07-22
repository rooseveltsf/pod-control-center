import type { EntityId, IsoDateTime, Timestamps } from "./common.js";

export type EpisodeStatus =
  | "draft"
  | "scheduled"
  | "recording"
  | "editing"
  | "publishing"
  | "published"
  | "failed";

/** Metadados editoriais de um episódio produzido no estúdio. */
export interface Episode extends Timestamps {
  id: EntityId;
  podId: EntityId;
  appointmentId?: EntityId;
  title: string;
  description?: string;
  status: EpisodeStatus;
  scheduledFor?: IsoDateTime;
  publishedAt?: IsoDateTime;
  durationSeconds?: number;
  youtubeVideoId?: string;
}

export interface CreateEpisodeInput {
  podId: EntityId;
  appointmentId?: EntityId;
  title: string;
  description?: string;
  scheduledFor?: IsoDateTime;
}

export interface UpdateEpisodeInput {
  title?: string;
  description?: string;
  status?: EpisodeStatus;
  scheduledFor?: IsoDateTime;
  publishedAt?: IsoDateTime;
  durationSeconds?: number;
  youtubeVideoId?: string;
}
