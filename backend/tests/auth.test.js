const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    test('connecte un utilisateur existant et renvoie un token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'password' })
        .expect(200);

      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toMatchObject({ email: 'admin@test.com' });
      expect(res.body.user).not.toHaveProperty('password');
    });

    test('refuse un mauvais mot de passe (400)', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'mauvais' })
        .expect(400);
    });

    test('refuse un email inconnu (400)', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'inconnu@test.com', password: 'password' })
        .expect(400);
    });
  });

  describe('POST /api/auth/register', () => {
    test('crée un nouvel utilisateur (201)', async () => {
      const email = `user${Date.now()}@test.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email, password: 'secret', name: 'Test User' })
        .expect(201);

      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(email);
    });

    test('refuse un email déjà utilisé (400)', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({ email: 'admin@test.com', password: 'x', name: 'Dup' })
        .expect(400);
    });
  });
});
