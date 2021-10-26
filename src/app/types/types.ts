export const departments = [
  'Development',
  'Management',
  'Sales',
  'Design',
  'Devops',
] as const;

export type Department = typeof departments[number];

export const level = [
  'Trainee',
  'Junior',
  'Intermediate',
  'Experienced',
  'Senior',
] as const;

export type Level = typeof level[number];

export interface User {
  id: number;
  joinDate: string;
  username: string;
  firstName: string;
  lastName: string;
  department: Department;
  level: Level;
}

export interface Pagination {
  page: number;
  total: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  duration: number;
  pagination: Pagination;
  results: T[]
}

export type GetUsersResponse = PaginatedResponse<User>;
