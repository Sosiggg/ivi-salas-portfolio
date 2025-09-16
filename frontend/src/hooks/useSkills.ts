import { useQuery } from '@tanstack/react-query';
import { api, Paginated } from '../utils/apiClient';

export interface Skill { id: number; name: string; category: string; level?: string }

export async function fetchSkills(): Promise<Paginated<Skill>> {
  const { data } = await api.get('/skills');
  return data;
}

export function useSkills() {
  return useQuery({ queryKey: ['skills'], queryFn: fetchSkills, staleTime: 5 * 60 * 1000 });
}
