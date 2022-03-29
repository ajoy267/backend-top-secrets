const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).post('/api/v1/users/signup').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({ id: expect.any(String), email });
  });
});
