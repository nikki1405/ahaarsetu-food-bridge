
export function formatDate(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  
  // Format the date in a readable format
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
