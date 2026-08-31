const request = require('supertest');
const app = require('../server');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'password' });
  token = res.body.token;
});

const auth = (req) => req.set('Authorization', `Bearer ${token}`);

describe('Tasks API', () => {
  test("refuse l'accès sans token (401)", async () => {
    await request(app).get('/api/tasks').expect(401);
  });

  test('refuse un token invalide (403)', async () => {
    await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer faux.token.xxx')
      .expect(403);
  });

  test('liste les tâches (200)', async () => {
    const res = await auth(request(app).get('/api/tasks')).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('crée une tâche (201)', async () => {
    const res = await auth(
      request(app).post('/api/tasks').send({ title: 'Nouvelle tâche', priority: 'high' })
    ).expect(201);

    expect(res.body).toMatchObject({ title: 'Nouvelle tâche', status: 'todo', priority: 'high' });
    expect(res.body).toHaveProperty('id');
  });

  test('refuse une tâche sans titre (400)', async () => {
    await auth(request(app).post('/api/tasks').send({ description: 'sans titre' })).expect(400);
  });

  test('modifie une tâche (200)', async () => {
    const created = await auth(
      request(app).post('/api/tasks').send({ title: 'À modifier' })
    );
    const res = await auth(
      request(app).put(`/api/tasks/${created.body.id}`).send({ status: 'done' })
    ).expect(200);

    expect(res.body.status).toBe('done');
  });

  test('renvoie 404 pour une tâche inexistante', async () => {
    await auth(request(app).put('/api/tasks/inexistant').send({ title: 'x' })).expect(404);
  });

  test('supprime une tâche (204)', async () => {
    const created = await auth(
      request(app).post('/api/tasks').send({ title: 'À supprimer' })
    );
    await auth(request(app).delete(`/api/tasks/${created.body.id}`)).expect(204);
    await auth(request(app).get(`/api/tasks/${created.body.id}`)).expect(404);
  });
});

describe('GET /health', () => {
  test('répond OK sans authentification', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body.status).toBe('OK');
  });
});
