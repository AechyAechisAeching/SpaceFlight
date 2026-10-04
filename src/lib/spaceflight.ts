const API_URL = "https://api.spaceflightnewsapi.net/v4"

export interface SpaceflightArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  published_at: string;
}

export async function getArticles(): Promise<SpaceflightArticle[]> {
  const response = await fetch(
    `${API_URL}/articles/?limit=10&ordering=-published_at`
  );

  if (!response.ok) {
    throw new Error(`API couldnt retrieve the articles: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.results as SpaceflightArticle[];
}
