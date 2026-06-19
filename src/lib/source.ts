import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { openapi } from '@/lib/openapi';

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: 'openapi',
      meta: {
        folderStyle: 'folder',
      },
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [openapi.loaderPlugin()],
  },
);
