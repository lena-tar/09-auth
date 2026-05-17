import { cookies } from "next/headers";
import api from "./api";
import { User } from "@/types/user";

const getHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (params?: Record<string, unknown>) => {
  const headers = await getHeaders();
  const res = await api.get("/notes", { params, headers });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const headers = await getHeaders();
  const res = await api.get(`/notes/${id}`, { headers });
  return res.data;
};

export const getServerMe = async (): Promise<User> => {
  const headers = await getHeaders();
  const res = await api.get<User>("/users/me", { headers });
  return res.data;
};

export const checkServerSession = async () => {
  const headers = await getHeaders();
  const res = await api.get("/auth/session", { headers });
  return res;
};
