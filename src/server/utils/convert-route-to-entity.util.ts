const mapping: Record<string, string> = {
  quizzes: 'quiz',
  teams: 'team',
  'team-members': 'team_member',
  'team-quizs': 'team_quiz',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
