import { useSkills } from './useSkills';
import { useCertificates } from './useCertificates';
import { useExperiences } from './useExperiences';
import { useEducation } from './useEducation';
import { useProjects } from './useProjects';

export function useSummary() {
  const skills = useSkills();
  const certificates = useCertificates();
  const experiences = useExperiences();
  const education = useEducation();
  // Default to first page, 10 items for summary
  const projects = useProjects(1, 10);

  // Aggregate loading and error states
  const isLoading = [skills, certificates, experiences, education, projects].some(q => q.isLoading);
  const isError = [skills, certificates, experiences, education, projects].some(q => q.isError);

  return {
    skills,
    certificates,
    experiences,
    education,
    projects,
    isLoading,
    isError,
  };
}
