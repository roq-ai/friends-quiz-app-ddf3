import * as yup from 'yup';

export const teamQuizValidationSchema = yup.object().shape({
  score: yup.number().integer(),
  team_id: yup.string().nullable(),
  quiz_id: yup.string().nullable(),
});
