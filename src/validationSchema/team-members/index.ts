import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  team_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
