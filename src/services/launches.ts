const API_URL = import.meta.env.LAUNCHES_API_URL;
const MANUFACTURER_API_URL = import.meta.env.MANUFACTURER_API_URL;
interface LaunchStatus {
  name: string;
  abbrev: string;
};

export interface SpaceflightLaunch {
  id: string;
  name: string;
  net: string | null;
  status: LaunchStatus;
  countdown: number;
  image: {
    image_url: string;
    thumbnail_url: string;
  }

  rocket?: {
    name?: string;
    variant?: number;
    configuration?: {
      name?: string;
    }
  };
  launch_service_provider?: {
    name?: string;
  };
  agency?:
  {
    name?: string;
  };
  pad?: {
    location?: {
      name?: string;
    }
  };
  location?: {
    name?: string;
  };
  mission?: {
    name?: string;
    orbit?: {
      name?: string;
    }
  };
  orbit?: {
    name?: string;
  };
}

export async function getAllLaunches(): Promise<SpaceflightLaunch[]> {
  const response = await fetch(
    `${API_URL}/launches/upcoming/?limit=25&ordering=net`,
  );

  if (!response.ok) {
    throw new Error(
      `API couldn't fetch all launches: ${response.status}`,
    );
  }
  const data = await response.json();
  return data.results as SpaceflightLaunch[];
}


export async function getManufacturer() {
  const response = await fetch(
    `${MANUFACTURER_API_URL}/config/launcher`,
  );

  if (!response.ok) {
    throw new Error(
      `Couldn't retrieve the Manufacturer details ${response.status}`,
    );
  };

  const data = await response.json();
  return data.results;

}


export async function getLaunches(): Promise<SpaceflightLaunch[]> {
  const response = await fetch(
    `${API_URL}/launches/upcoming/?limit=25&ordering=net`,
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
