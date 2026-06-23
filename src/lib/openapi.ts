import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { normalizeOpenApiDocument } from './openapi-normalize';

export const openapi = createOpenAPI({
  input: {
    socialchat: async () => {
      const schema = JSON.parse(await readFile(resolve(process.cwd(), 'openapi.json'), 'utf8'));
      return normalizeOpenApiDocument(schema);
    },
  },
  proxyUrl: '/api/proxy',
});
