const API_URL = import.meta.env.LAUNCHES_API_URL;

export interface SpaceflightLaunch {
  id: string;
  name: string;
  net: string | null;
  status: string;
  countdown: number;
  image: {
    image_url: string;
    thumbnail_url: string;
  }
}

export async function getLaunches(): Promise<SpaceflightLaunch[]> {
  const response = await fetch(
    `${API_URL}/launches/upcoming/?limit=20&ordering=net`,
  );

  if (!response.ok) {
    throw new Error(
      `API couldn't retrieve the launch: ${response.status}`,
    );
  }
  const date = await response.json();
  const now = Date.now();
  return (date.results as SpaceflightLaunch[]).filter((launch) => {
    if (!launch.net) return false;
    const launchTime = new Date(launch.net).getTime();
    return Number.isFinite(launchTime) && launchTime > now;
  })
    .sort((a, b) => new Date(a.net!).getTime() - new Date(b.net!).getTime())
    .slice(0, 1);
}
