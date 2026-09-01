/**
 * types/index.ts — app-wide shared types (non feature-specific).
 */

export type ID = string;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: { page: number; pageSize: number; total: number };
}