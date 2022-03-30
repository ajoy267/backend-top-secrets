const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// Dummy User
const mockUser = {
  email: 'test@example.com',
  password: 'abcdefg',
};

describe('backend-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a secret', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockUser });
    await agent.post('/api/v1/users/sessions').send(mockUser);

    const expected = {
      title: 'Assingment',
      description: 'this is hard',
    };

    const res = await agent.post('/api/v1/secrets').send(expected);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...expected,
      createdAt: expect.any(String),
    });
  });

  it('should get all the secrets if a user is signed in', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockUser });
    await agent.post('/api/v1/users/sessions').send(mockUser);

    const expected = [
      {
        title: 'Assingment',
        description: 'this is hard',
        createdAt: expect.any(String),
      },
    ];
    const res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });
});
