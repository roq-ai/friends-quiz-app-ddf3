import axios from 'axios';
import queryString from 'query-string';
import { TeamQuizInterface, TeamQuizGetQueryInterface } from 'interfaces/team-quiz';
import { GetQueryInterface } from '../../interfaces';

export const getTeamQuizs = async (query?: TeamQuizGetQueryInterface) => {
  const response = await axios.get(`/api/team-quizs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeamQuiz = async (teamQuiz: TeamQuizInterface) => {
  const response = await axios.post('/api/team-quizs', teamQuiz);
  return response.data;
};

export const updateTeamQuizById = async (id: string, teamQuiz: TeamQuizInterface) => {
  const response = await axios.put(`/api/team-quizs/${id}`, teamQuiz);
  return response.data;
};

export const getTeamQuizById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/team-quizs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamQuizById = async (id: string) => {
  const response = await axios.delete(`/api/team-quizs/${id}`);
  return response.data;
};
