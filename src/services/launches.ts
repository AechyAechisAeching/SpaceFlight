const API_URL = import.meta.env.LAUNCHES_API_URL;
const MANUFACTURER_API_URL = import.meta.env.MANUFACTURER_API_URL;


type CacheEntry = {
  expiresAt: number;
  promise: Promise<unknown>;
};

const apiCache = new Map<string, CacheEntry>();

async function fetchJsonCached<T>(
  url: string,
  ttlMs: number,
): Promise<T> {
  const cached = apiCache.get(url);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise as Promise<T>;
  }

  const entry: CacheEntry = {
    expiresAt: Number.POSITIVE_INFINITY,
    promise: Promise.resolve(),
  };

  entry.promise = fetch(url).then(async (response) => {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = (await response.json()) as T;
    entry.expiresAt = Date.now() + ttlMs;
    return data;
  });

  apiCache.set(url, entry);

  try {
    return (await entry.promise) as T;
  } catch (error) {
    if (apiCache.get(url) === entry) {
      apiCache.delete(url);
    }

    throw error;
  }
}

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

export interface Manufacturer {
  id: number;
  name: string;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  founding_year: string | null;
  logo_url: string | null;
}

export interface RocketConfigurationDetails {
  id: number;
  name: string;
  manufacturer: Pick<Manufacturer, 'name'> | null;
}

export async function getAllLaunches(): Promise<SpaceflightLaunch[]> {
  const url = `${API_URL}/launches/upcoming/?limit=25&ordering=net`;

  const data = await fetchJsonCached<{
    results: SpaceflightLaunch[];
  }>(url, 60_000);

  return data.results;
}


export async function getRocketConfiguration(
  configurationId: number,
): Promise<RocketConfigurationDetails> {
  const response = await fetch(
    `${MANUFACTURER_API_URL}/config/launcher/${configurationId}/?mode=detailed`,
  );

  if (!response.ok) {
    throw new Error(
      `Couldn't fetch rocket configuration details: ${response.status}`,
    );
  }

  const data = await response.json();
  return data as RocketConfigurationDetails;

}

export async function getLaunches(): Promise<SpaceflightLaunch[]> {
  const launches = await getAllLaunches();
  const now = Date.now();

  return launches
    .filter((launch) => {
      if (!launch.net) return false;

      const launchTime = new Date(launch.net).getTime();

      return Number.isFinite(launchTime) && launchTime > now;
    })
    .sort(
      (a, b) =>
        new Date(a.net!).getTime() -
        new Date(b.net!).getTime(),
    )
    .slice(0, 1);
}
