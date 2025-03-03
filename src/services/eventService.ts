// import { supabase } from '../utils/supabase';
// import type { SportsEvent } from '../utils/types';

// export const eventService = {
//   async getEvents(organization?: string) {
//     const query = supabase
//       .from('sports_events')
//       .select('*')
//       .order('event_date', { ascending: true });

//     if (organization) {
//       query.eq('organization', organization);
//     }

//     const { data, error } = await query;
//     if (error) throw error;
//     return data as SportsEvent[];
//   },

//   async getUpcomingEvents() {
//     const { data, error } = await supabase
//       .from('sports_events')
//       .select('*')
//       .eq('status', 'upcoming')
//       .order('event_date', { ascending: true });

//     if (error) throw error;
//     return data as SportsEvent[];
//   }
// };