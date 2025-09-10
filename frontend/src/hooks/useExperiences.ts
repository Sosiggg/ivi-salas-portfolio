import { useQuery } from '@tanstack/react-query';
import { api, Paginated } from '../utils/apiClient';

export interface Experience { id: number; company: string; role: string; description?: string; start_date: string; end_date?: string }

async function fetchExperiences(): Promise<Paginated<Experience>> {
  const { data } = await api.get('/experiences');
  return data;
}

export function useExperiences() {
  return useQuery({ queryKey: ['experiences'], queryFn: fetchExperiences, staleTime: 5 * 60 * 1000 });
}
