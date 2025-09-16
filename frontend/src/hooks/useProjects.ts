import { useQuery } from '@tanstack/react-query';
import { api, Paginated } from '../utils/apiClient';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  repo_url?: string;
  demo_url?: string;
  image_url?: string;
}

export async function fetchProjects(page: number, limit: number): Promise<Paginated<Project>> {
  const skip = (page - 1) * limit;
  const { data } = await api.get(`/projects?skip=${skip}&limit=${limit}`);
  return data;
}

export function useProjects(page: number, limit = 10) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => fetchProjects(page, limit),
    staleTime: 60 * 1000,
  });
}
