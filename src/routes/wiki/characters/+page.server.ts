import { supabase } from '$lib/functions/supabase/supabaseClient';

export interface MortalisCharacter {
	id: number;
	name: string;
	age: number;
	origin: string;
	description: string;
}

export async function load() {
	const { data } = await supabase.from('mortalis-characters').select();
	return {
		characters: (data as MortalisCharacter[]) ?? []
	};
}
