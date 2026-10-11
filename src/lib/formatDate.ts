export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();


  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;

}
