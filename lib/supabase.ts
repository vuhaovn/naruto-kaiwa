import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RemoteData } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Nếu chưa cấu hình Supabase, app vẫn chạy và chỉ lưu trên máy.
// flowType "implicit": link đăng nhập mở được cả khi app email bật trình duyệt khác.
export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: { flowType: "implicit", persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
      })
    : null;

function client(): SupabaseClient {
  if (!supabase) throw new Error("Supabase chưa được cấu hình");
  return supabase;
}

/** Dữ liệu trên server (chưa kiểm tra kiểu → để store.merge chuẩn hoá). */
export async function pullRemote(userId: string): Promise<unknown> {
  const { data, error } = await client().from("user_data").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return (data as { data: unknown } | null)?.data ?? null;
}

export async function pushRemote(userId: string, payload: RemoteData): Promise<void> {
  const { error } = await client()
    .from("user_data")
    .upsert({ user_id: userId, data: payload, updated_at: new Date().toISOString() });
  if (error) throw error;
}
