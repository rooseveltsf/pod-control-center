import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Appointment, Episode, Pod, Transmission } from "@pod-control-center/types";

export interface LocalDatabase {
  version: 1;
  pods: Pod[];
  appointments: Appointment[];
  episodes: Episode[];
  transmissions: Transmission[];
}

const now = () => new Date().toISOString();

function createSeedDatabase(): LocalDatabase {
  const createdAt = now();

  return {
    version: 1,
    pods: [
      {
        id: "pod-01",
        name: "Pod 01",
        description: "Estúdio principal",
        status: "live",
        lastActivityAt: createdAt,
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "pod-02",
        name: "Pod 02",
        description: "Estúdio de entrevistas",
        status: "preparing",
        lastActivityAt: createdAt,
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "pod-03",
        name: "Pod 03",
        description: "Estúdio auxiliar",
        status: "offline",
        createdAt,
        updatedAt: createdAt,
      },
    ],
    appointments: [],
    episodes: [],
    transmissions: [],
  };
}

export class LocalStore {
  private constructor(
    private readonly filePath: string,
    private database: LocalDatabase,
  ) {}

  static async open(filePath: string): Promise<LocalStore> {
    try {
      const contents = await readFile(filePath, "utf8");
      const parsed: unknown = JSON.parse(contents);
      if (!isDatabase(parsed)) throw new Error("Formato de banco local inválido.");
      return new LocalStore(filePath, parsed);
    } catch (error) {
      if (isMissingFile(error)) {
        const database = createSeedDatabase();
        const store = new LocalStore(filePath, database);
        await store.save();
        return store;
      }
      throw error;
    }
  }

  get data(): LocalDatabase {
    return this.database;
  }

  async save(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, `${JSON.stringify(this.database, null, 2)}\n`, "utf8");
  }
}

function isMissingFile(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function isDatabase(value: unknown): value is LocalDatabase {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<LocalDatabase>;
  return (
    candidate.version === 1 &&
    Array.isArray(candidate.pods) &&
    Array.isArray(candidate.appointments) &&
    Array.isArray(candidate.episodes) &&
    Array.isArray(candidate.transmissions)
  );
}
