import { supabase } from "./supabase";
import { Song } from "./types_db";

const getSongs = async (searchQueryId): Promise<Song[]> => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', searchQueryId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data || [];
};

export default getSongs;
