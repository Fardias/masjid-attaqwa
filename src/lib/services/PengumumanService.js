import { supabase } from "@/lib/supabase/supabaseClient";

export const getPengumuman = async () => {
  const { data, error } = await supabase
    .from("latest_announcements")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getPengumumanById = async (id) => {
  const { data, error } = await supabase
    .from("latest_announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
export const addPengumuman = async (pengumuman) => {
  console.log("Add Pengumuman : ", pengumuman);

  const { data, error } = await supabase
    .from("latest_announcements")
    .insert(pengumuman)
    .select();

  if (error) throw error;

  return data;
};

export const updatePengumuman = async (id, pengumuman) => {
  const { data, error } = await supabase
    .from("latest_announcements")
    .update(pengumuman)
    .eq("id", id)
    .select();
};

export const deletePengumuman = async (id) => {
  const { data, error } = await supabase
    .from("latest_announcements")
    .delete()
    .eq("id", id);
};
