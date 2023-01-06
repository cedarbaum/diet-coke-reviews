export function getCanTypesFromRating(rating) {
  const canTypes = [];
  for (let i = 1; i <= Math.ceil(rating); i++) {
    if (i > rating) {
      canTypes.push("half-can");
    } else {
      canTypes.push("full-can");
    }
  }

  return canTypes;
}
