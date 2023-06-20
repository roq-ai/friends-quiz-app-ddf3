import axios from 'axios';
import queryString from 'query-string';
import { TeamMemberInterface, TeamMemberGetQueryInterface } from 'interfaces/team-member';
import { GetQueryInterface } from '../../interfaces';

export const getTeamMembers = async (query?: TeamMemberGetQueryInterface) => {
  const response = await axios.get(`/api/team-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeamMember = async (teamMember: TeamMemberInterface) => {
  const response = await axios.post('/api/team-members', teamMember);
  return response.data;
};

export const updateTeamMemberById = async (id: string, teamMember: TeamMemberInterface) => {
  const response = await axios.put(`/api/team-members/${id}`, teamMember);
  return response.data;
};

export const getTeamMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/team-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamMemberById = async (id: string) => {
  const response = await axios.delete(`/api/team-members/${id}`);
  return response.data;
};
