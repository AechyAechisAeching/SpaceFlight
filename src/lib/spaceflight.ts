const API_URL = "https://api.spaceflightnewsapi.net/v4";


export async function getArticles() {
  const response = await fetch(
    `${API_URL}/articles/?limit=10&ordering=-published_at`,
  );

  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`)
  }

  const data = await response.json();
  return data.results;
}
