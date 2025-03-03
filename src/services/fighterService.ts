// import { supabase } from '../utils/supabase';
// import type { Fighter } from '../utils/types';

// export const fighterService = {
//   async getFighters(organization?: string) {
//     const query = supabase
//       .from('fighters')
//       .select('*')
//       .order('name');

//     if (organization) {
//       query.eq('organization', organization);
//     }

//     const { data, error } = await query;
//     if (error) throw error;
//     return data as Fighter[];
//   },

//   async getFighterById(id: string) {
//     const { data, error } = await supabase
//       .from('fighters')
//       .select('*')
//       .eq('id', id)
//       .single();

//     if (error) throw error;
//     return data as Fighter;
//   }
// };