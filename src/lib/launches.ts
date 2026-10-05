const API_URL = import.meta.env.LAUNCHES_API_URL;

export interface SpaceflightLaunch {
  id: string;
  name: string;
  net: string | null;
}

export async function getLaunches(): Promise<SpaceflightLaunch[]> {
  const response = await fetch(
    `${API_URL}/launches/upcoming/?limit=4`,
  );

  if (!response.ok) {
    throw new Error(
      `API couldn't retrieve the launch: ${response.status}`,
    );
  }
  const data = await response.json()
  return data.results as SpaceflightLaunch[];
}
