export const removeUndefined = (o) =>
  Object.entries(o)
    .filter(([, val]) => val !== undefined)
    .reduce((result, [key, val]) => {
      result[key] = val
      return result
    }, {})
