const parseQuery = query => {
  if (!query || typeof query !== 'string') return '';

  return query
    .split('&')
    .map(q => {
      const [key, value] = q.split('=');
      return value ? `${key} => ${value}` : `${key}`;
    })
    .join('\n');
};

export { parseQuery };
