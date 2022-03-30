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

  it('should create a new user with an email/password', async () => {
    const res = await request(app).post('/api/v1/users/').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({ id: expect.any(String), email });
  });

  it('should let a user sign in if the email/password match', async () => {
    const user = await UserService.create(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);

    expect(res.body).toEqual({ message: 'Sign in successful.', user });
  });

  it('DELETE route successfully logs out a user', async () => {
    const agent = request.agent(app);
    await UserService.create(mockUser);
    await agent.post('/api/v1/users/sessions').send(mockUser);
    const res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({ message: 'Sign out successful' });
  });
});
