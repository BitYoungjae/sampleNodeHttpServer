const parseQuery = query => {
  const splitted = query.split('&');
  const mapped = splitted
    .map(q => q.split('='))
    .map(([key, value]) => (value ? `${key} => ${value}` : key));

  return mapped;
};

export { parseQuery };
