/** Identificador estável de uma entidade no Pod Control Center. */
export type EntityId = string;

/** Data e hora em UTC, serializada no formato ISO 8601. */
export type IsoDateTime = string;

/** Campos presentes em entidades armazenadas. */
export interface Timestamps {
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/** Referência a uma falha que possa ser exibida ou registrada pelo cliente. */
export interface OperationError {
  code: string;
  message: string;
  occurredAt: IsoDateTime;
}
