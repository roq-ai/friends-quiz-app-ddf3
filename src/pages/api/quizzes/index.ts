import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { quizValidationSchema } from 'validationSchema/quizzes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getQuizzes();
    case 'POST':
      return createQuiz();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getQuizzes() {
    const data = await prisma.quiz
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'quiz'));
    return res.status(200).json(data);
  }

  async function createQuiz() {
    await quizValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.team_quiz?.length > 0) {
      const create_team_quiz = body.team_quiz;
      body.team_quiz = {
        create: create_team_quiz,
      };
    } else {
      delete body.team_quiz;
    }
    const data = await prisma.quiz.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
