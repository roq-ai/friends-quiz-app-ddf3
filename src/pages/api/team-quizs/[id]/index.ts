import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { teamQuizValidationSchema } from 'validationSchema/team-quizs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.team_quiz
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTeamQuizById();
    case 'PUT':
      return updateTeamQuizById();
    case 'DELETE':
      return deleteTeamQuizById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeamQuizById() {
    const data = await prisma.team_quiz.findFirst(convertQueryToPrismaUtil(req.query, 'team_quiz'));
    return res.status(200).json(data);
  }

  async function updateTeamQuizById() {
    await teamQuizValidationSchema.validate(req.body);
    const data = await prisma.team_quiz.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTeamQuizById() {
    const data = await prisma.team_quiz.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
