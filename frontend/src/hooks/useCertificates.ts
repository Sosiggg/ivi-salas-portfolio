import { useQuery } from '@tanstack/react-query';
import { api, Paginated } from '../utils/apiClient';

export interface Certificate { id: number; title: string; issuer: string; verification_url?: string; image_url?: string }

export async function fetchCertificates(): Promise<Paginated<Certificate>> {
  const { data } = await api.get('/certificates');
  return data;
}

export function useCertificates() {
  return useQuery({ queryKey: ['certificates'], queryFn: fetchCertificates, staleTime: 5 * 60 * 1000 });
}
