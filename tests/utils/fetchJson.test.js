import { fetchJson } from '../../src/utils/fetchJson';

// Mock fetch for Vitest
globalThis.fetch = async (url) => {
  if (url === '/data/test.json') {
    return {
      ok: true,
      json: async () => ({ foo: 'bar' })
    };
  }
  return { ok: false };
};

describe('fetchJson', () => {
  it('returns parsed JSON when fetch is successful', async () => {
    const data = await fetchJson('test.json');
    expect(data).toEqual({ foo: 'bar' });
  });

  it('throws error when fetch fails', async () => {
    await expect(fetchJson('notfound.json')).rejects.toThrow('Erro ao carregar notfound.json');
  });
});
