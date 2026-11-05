type LaunchSlugInput = {
  id?: string | null;
  rocket?: {
    name?: string | null;
    configuration?: {
      name?: string | null
    } | null;
  } | null;
};


function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getLaunchSlug(launch: LaunchSlugInput): string {
  const rocketName = launch.rocket?.configuration?.name
    ?? launch.rocket?.name
    ?? 'unknown-rocket';
  return `${slugify(rocketName)}-${launch.id}`;
}


