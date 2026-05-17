import api from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (data: RegisterData): Promise<User> => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginData): Promise<User> => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<{ success: boolean }>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (data: Partial<User>): Promise<User> => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};

export const fetchNotes = async (
  params?: Record<string, unknown>,
): Promise<NotesResponse> => {
  const res = await api.get<NotesResponse>("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};
