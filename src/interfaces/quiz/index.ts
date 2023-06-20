import { TeamQuizInterface } from 'interfaces/team-quiz';
import { GetQueryInterface } from 'interfaces';

export interface QuizInterface {
  id?: string;
  title: string;
  questions: number;
  created_at?: any;
  updated_at?: any;
  team_quiz?: TeamQuizInterface[];

  _count?: {
    team_quiz?: number;
  };
}

export interface QuizGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
}
