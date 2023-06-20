import { TeamMemberInterface } from 'interfaces/team-member';
import { TeamQuizInterface } from 'interfaces/team-quiz';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  team_member?: TeamMemberInterface[];
  team_quiz?: TeamQuizInterface[];
  user?: UserInterface;
  _count?: {
    team_member?: number;
    team_quiz?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
