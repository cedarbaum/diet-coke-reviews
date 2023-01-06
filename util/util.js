export function getCanTypesFromRating(rating) {
  const canTypes = [];
  console.log(rating);
  for (let i = 1; i <= Math.ceil(rating); i++) {
    console.log(i);
    if (i > rating) {
      canTypes.push("half-can");
    } else {
      canTypes.push("full-can");
    }
  }

  return canTypes;
}
