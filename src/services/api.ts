const BASE_URL = "https://backend-todoapp-fpau.onrender.com/api";

// ── Types ────────────────────────────────────────────────────

export type UserPayload = {
  username: string;
  password: string;
  email?: string;
};

export type User = {
  username: string;
  email: string;
};

export type TaskPayload = {
  userId: string;
  title: string;
  description: string;
  status: string;   // "todo" | "in-progress" | "review" | "done"
  position: number;
};

export type BackendTask = TaskPayload & { id: number };

// ── Helpers ──────────────────────────────────────────────────

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }

  return res.json();
}

// ── Auth API ─────────────────────────────────────────────────

export const authApi = {
  register: (data: UserPayload) =>
    request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: Pick<UserPayload, "username" | "password">) =>
    request<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAllUsers: () => request<User[]>("/auth/users"),
};

// ── Tasks API ────────────────────────────────────────────────

export const tasksApi = {
  createTask: (task: TaskPayload) =>
    request<BackendTask>("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),
};
