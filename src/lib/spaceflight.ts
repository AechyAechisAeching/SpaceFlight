const API_URL = "https://api.spaceflightnewsapi.net/v4"

export interface SpaceflightArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  published_at: string;
}

export interface SpaceflightBlog {
  id: number;
  title: string;
  author: string;
  image_url: string;
  published_at: string;
  updated_at: string;
}

export interface SpaceflightReport {
  id: number;
  title: string;
  summary: string;
  author: string;
  image_url: string;
  published_at: string;
  updated_at: string;
}


// Blogs endpoint
export async function getBlogs(): Promise<SpaceflightBlog[]> {
  const response = await fetch(
    `${API_URL}/blogs/?limit=5&ordering=-published_at`
  );

  if (!response.ok) {
    throw new Error(`API couldnt retrieve the blogs: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.results as SpaceflightBlog[];

}

// Articles endpoint
export async function getArticles(): Promise<SpaceflightArticle[]> {
  const response = await fetch(
    `${API_URL}/articles/?limit=2&ordering=-published_at`
  );

  if (!response.ok) {
    throw new Error(`API couldnt retrieve the articles: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.results as SpaceflightArticle[];
}

// Reports endpoint
export async function getReports(): Promise<SpaceflightReport[]> {
  const response = await fetch(
    `${API_URL}/reports/?limit=5&ordering=-published_at`
  );

  if (!response.ok) {
    throw new Error(`API couldnt retrieve the reports: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.results as SpaceflightReport[];

}
