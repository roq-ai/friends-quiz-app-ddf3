import { TeamInterface } from 'interfaces/team';
import { QuizInterface } from 'interfaces/quiz';
import { GetQueryInterface } from 'interfaces';

export interface TeamQuizInterface {
  id?: string;
  team_id?: string;
  quiz_id?: string;
  score?: number;
  created_at?: any;
  updated_at?: any;

  team?: TeamInterface;
  quiz?: QuizInterface;
  _count?: {};
}

export interface TeamQuizGetQueryInterface extends GetQueryInterface {
  id?: string;
  team_id?: string;
  quiz_id?: string;
}
