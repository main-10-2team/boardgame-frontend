export async function fetchTodayQuestion(step: number) {
  const res = await fetch(`/api/today/today-questions/${step}`);
  return res.json();
}
