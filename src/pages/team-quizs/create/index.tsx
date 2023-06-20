import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTeamQuiz } from 'apiSdk/team-quizs';
import { Error } from 'components/error';
import { teamQuizValidationSchema } from 'validationSchema/team-quizs';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamInterface } from 'interfaces/team';
import { QuizInterface } from 'interfaces/quiz';
import { getTeams } from 'apiSdk/teams';
import { getQuizzes } from 'apiSdk/quizzes';
import { TeamQuizInterface } from 'interfaces/team-quiz';

function TeamQuizCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TeamQuizInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTeamQuiz(values);
      resetForm();
      router.push('/team-quizs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TeamQuizInterface>({
    initialValues: {
      score: 0,
      team_id: (router.query.team_id as string) ?? null,
      quiz_id: (router.query.quiz_id as string) ?? null,
    },
    validationSchema: teamQuizValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Team Quiz
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="score" mb="4" isInvalid={!!formik.errors?.score}>
            <FormLabel>Score</FormLabel>
            <NumberInput
              name="score"
              value={formik.values?.score}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('score', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.score && <FormErrorMessage>{formik.errors?.score}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'Select Team'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<QuizInterface>
            formik={formik}
            name={'quiz_id'}
            label={'Select Quiz'}
            placeholder={'Select Quiz'}
            fetcher={getQuizzes}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'team_quiz',
  operation: AccessOperationEnum.CREATE,
})(TeamQuizCreatePage);
