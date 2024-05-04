export function generateId(prefix: string, queue: number): string {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return prefix + day + month + year + queue;
}
