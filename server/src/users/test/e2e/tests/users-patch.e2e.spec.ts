import { USERS_PATCH_EXPECT } from './../../values/users.e2e-const.expect';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'prisma/test/prisma-client';
import { UPDATE_USER_DTO } from 'users/test/values/users.const.dto';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';

const currentUserId = 'patch_current_user_id';
const secondUserId = 'patch_second_user_id';

describe('users (PATCH)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    await prepareBefore(currentUserId, secondUserId);

    await prismaClient.interest.createMany({
      data: [
        { id: 'interest-id-1', name: 'traveling' },
        { id: 'interest-id-2', name: 'ski' },
      ],
    });

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await prepareAfter(currentUserId, secondUserId);
    await prismaClient.interest.deleteMany({
      where: {
        id: {
          in: ['interest-id-1', 'interest-id-2'],
        },
      },
    });

    await app.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prepareAfter(currentUserId, secondUserId);
    await prepareBefore(currentUserId, secondUserId);
  });

  describe('when it is called correctly', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareAccessTokens(
        currentUserId,
        secondUserId,
      );

      response = await request(httpServer)
        .patch('/users')
        .send({
          ...UPDATE_USER_DTO,
          interests: [
            ...UPDATE_USER_DTO.interests,
            'wrong-interest-1',
            'wrong-interest-2',
          ],
        })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', async () => {
      const user = response.body;
      expect(response.status).toBe(200);

      // to equal interest items by another way
      expect(user).toEqual(USERS_PATCH_EXPECT);
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareAccessTokens(
        currentUserId,
        secondUserId,
      );

      response = await request(httpServer)
        .patch('/users')
        .send({ name: 'William' })
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer)
        .patch('/users')
        .send({ name: 'William' });
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
