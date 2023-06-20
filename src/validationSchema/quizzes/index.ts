import * as yup from 'yup';

export const quizValidationSchema = yup.object().shape({
  title: yup.string().required(),
  questions: yup.number().integer().required(),
});
