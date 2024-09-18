import { createClient } from '@supabase/supabase-js';
import { VITE_SUPABASE_ANON_KEY } from '$env/static/private';

export const supabase = createClient(
	'https://gbeohfomwjnfelsjqytz.supabase.co',
	VITE_SUPABASE_ANON_KEY
);
