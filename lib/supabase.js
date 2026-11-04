import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Nếu chưa cấu hình Supabase, app vẫn chạy và chỉ lưu trên máy.
// flowType "implicit": link đăng nhập mở được cả khi app email bật trình duyệt khác.
export const supabase =
  url && key
    ? createClient(url, key, { auth: { flowType: "implicit", persistSession: true, detectSessionInUrl: true, autoRefreshToken: true } })
    : null;

export async function pullRemote(userId) {
  const { data, error } = await supabase.from("user_data").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data?.data || null;
}

export async function pushRemote(userId, payload) {
  const { error } = await supabase
    .from("user_data")
    .upsert({ user_id: userId, data: payload, updated_at: new Date().toISOString() });
  if (error) throw error;
}
