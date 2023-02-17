export function getCanTypesFromRating(rating) {
  const canTypes = [];
  for (let i = 1; i <= 5; i++) {
    if (i > rating && i <= Math.ceil(rating)) {
      canTypes.push("half-can");
    } else if (i <= rating) {
      canTypes.push("full-can");
    } else {
      canTypes.push("empty-can");
    }
  }

  return canTypes;
}
