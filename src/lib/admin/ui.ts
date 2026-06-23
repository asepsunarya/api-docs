export function idString(value: unknown) {
  return typeof value === 'object' && value && 'toString' in value ? value.toString() : '';
}

export function dateString(value?: Date) {
  if (!value) return '-';
  return new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}
