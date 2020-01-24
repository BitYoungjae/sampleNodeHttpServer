const parseQuery = query => {
  const splitted = query.split('&');
  const mapped = splitted
    .filter(q => !!q)
    .map(q => q.split('='))
    .map(([key, value]) => (value ? `${key} => ${value}` : key));

  return mapped;
};

export { parseQuery };
