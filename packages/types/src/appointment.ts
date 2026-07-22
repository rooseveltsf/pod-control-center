import type { EntityId, IsoDateTime, Timestamps } from "./common.js";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

/** Uma reserva de pod para gravação, transmissão ou outra produção. */
export interface Appointment extends Timestamps {
  id: EntityId;
  podId: EntityId;
  title: string;
  notes?: string;
  status: AppointmentStatus;
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  participantCount: number;
}

export interface CreateAppointmentInput {
  podId: EntityId;
  title: string;
  notes?: string;
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  participantCount?: number;
}

export interface UpdateAppointmentInput {
  podId?: EntityId;
  title?: string;
  notes?: string;
  status?: AppointmentStatus;
  startsAt?: IsoDateTime;
  endsAt?: IsoDateTime;
  participantCount?: number;
}
