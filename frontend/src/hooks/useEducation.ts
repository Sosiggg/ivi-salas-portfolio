import { useQuery } from '@tanstack/react-query';
import { api, Paginated } from '../utils/apiClient';

export interface Education { id: number; institution: string; degree: string; field?: string; start_date: string; end_date?: string }

async function fetchEducation(): Promise<Paginated<Education>> {
  const { data } = await api.get('/education');
  return data;
}

export function useEducation() {
  return useQuery({ queryKey: ['education'], queryFn: fetchEducation, staleTime: 5 * 60 * 1000 });
}
