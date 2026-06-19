import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Fumadocs + Scalar',
    },
    links: [
      {
        text: 'OpenAPI',
        url: '/docs/openapi',
        active: 'nested-url',
      },
    ],
  };
}
