type OpenApiDocument = {
  tags?: Array<Record<string, unknown> & { name?: string; description?: string; summary?: string }>;
  paths?: Record<string, unknown>;
  [key: string]: unknown;
};

type OpenApiOperation = {
  operationId?: string;
  summary?: string;
  tags?: string[];
  [key: string]: unknown;
};

const HTTP_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']);
const ACRONYMS: Record<string, string> = {
  Api: 'API',
  Ai: 'AI',
  Id: 'ID',
  Json: 'JSON',
  Jwt: 'JWT',
  Oauth: 'OAuth',
  Otp: 'OTP',
  Qr: 'QR',
  Sms: 'SMS',
  Url: 'URL',
  Uuid: 'UUID',
  Wa: 'WA',
  Whats: 'Whats',
  Whatsapp: 'WhatsApp',
  Zapier: 'Zapier',
};

function titleCaseToken(token: string) {
  if (!token) return token;
  const titled = `${token[0].toUpperCase()}${token.slice(1).toLowerCase()}`;
  return ACRONYMS[titled] ?? titled;
}

function splitIdentifier(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function operationIdToSummary(operationId: string) {
  const actionName = operationId.replace(/^[A-Za-z0-9]+Controller_/, '');
  const words = splitIdentifier(actionName);

  if (!words) return operationId;

  return words
    .split(' ')
    .map(titleCaseToken)
    .join(' ')
    .replace(/Whats App/g, 'WhatsApp');
}

function tagDisplayName(tag: string) {
  const withoutSuffix = tag.replace(/\s+(API|Controller)$/i, '');
  return splitIdentifier(withoutSuffix)
    .split(' ')
    .map(titleCaseToken)
    .join(' ')
    .replace(/Whats App/g, 'WhatsApp');
}

function collectOperationTags(document: OpenApiDocument) {
  const tags = new Map<string, Record<string, unknown> & { name: string }>();

  for (const tag of document.tags ?? []) {
    if (typeof tag.name === 'string' && tag.name.length > 0) {
      tags.set(tag.name, { ...tag, name: tag.name });
    }
  }

  for (const pathItem of Object.values(document.paths ?? {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.has(method) || !operation || typeof operation !== 'object') continue;

      const operationTags = (operation as OpenApiOperation).tags;
      if (!Array.isArray(operationTags)) continue;

      for (const tagName of operationTags) {
        if (typeof tagName !== 'string' || tagName.length === 0 || tags.has(tagName)) continue;

        tags.set(tagName, {
          name: tagName,
          'x-displayName': tagDisplayName(tagName),
        });
      }
    }
  }

  return Array.from(tags.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function normalizeOpenApiDocument<T extends OpenApiDocument>(document: T): T {
  const normalized = structuredClone(document);

  for (const pathItem of Object.values(normalized.paths ?? {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.has(method) || !operation || typeof operation !== 'object') continue;

      const op = operation as OpenApiOperation;
      if (!op.summary && op.operationId) {
        op.summary = operationIdToSummary(op.operationId);
      }
    }
  }

  normalized.tags = collectOperationTags(normalized);

  return normalized;
}
