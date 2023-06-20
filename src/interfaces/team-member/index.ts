import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  team_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  team?: TeamInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  team_id?: string;
  user_id?: string;
}
