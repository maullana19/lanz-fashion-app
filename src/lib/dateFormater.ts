const today = new Date()

export const datesFormatted = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).format(today)
