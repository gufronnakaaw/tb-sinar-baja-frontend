export function estimation(day: number) {
  let today = new Date();
  let futureDate = new Date();
  futureDate.setDate(today.getDate() + day);

  return futureDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
