import { supabase } from "./supabase";
import { Artist } from "./types_db";

const getArtists = async (artistIds): Promise<Artist[]> => {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .in('id', artistIds)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data || [];
};

export default getArtists;
