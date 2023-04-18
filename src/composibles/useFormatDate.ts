type OptionTime = {
  hour: 'numeric' | '2-digit' | undefined
  minute: 'numeric' | '2-digit' | undefined
  hour12: boolean
  timeZone: string
}

// expect result with indonesian local time zone, ex: 20.30 AM or 20.30 PM
export function formattedTime (time: string) {
  const currentDate = new Date(time)
  const options: OptionTime = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  }
  const formatted = currentDate.toLocaleString('id-ID', options).replace(':', '.')
  return formatted
}

//  expect result with formatting date 
export function formatDateString(date: Date, format: 'full-type' | 'month'): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if (format === 'full-type') {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else if (format === 'month') {
    return `${year}-${String(month).padStart(2, '0')}`;
  }
  
  return '';
}
