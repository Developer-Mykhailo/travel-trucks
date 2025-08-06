export const parseFiltersFromParams = (params) => {
  const filters = {};
  for (const [key, value] of params.entries()) {
    if (key === "page") continue;
    if (value === "true") {
      filters[key] = true;
    } else {
      filters[key] = value;
    }
  }
  return filters;
};
