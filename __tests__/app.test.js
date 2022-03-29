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
    const res = await request(app).post('/api/v1/users/session').send(mockUser);

    expect(res.body).toEqual({ message: 'Sign in Successful', user });
  });
});
