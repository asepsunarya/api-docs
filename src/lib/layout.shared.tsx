import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

const socialchatLogoUrl = 'https://socialchat.id/socialchat-logo.svg';

function SocialchatTitle() {
  return (
    <span className="inline-flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={socialchatLogoUrl} alt="Socialchat" className="h-8 w-auto" />
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <SocialchatTitle />,
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
