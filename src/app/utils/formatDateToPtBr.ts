export function formatDateToPtBr(dateString: string) {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  const isoDateTimePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|([+-]\d{2}:\d{2}))?$/;
  const brDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;

  let date;

  if (isoDatePattern.test(dateString) || isoDateTimePattern.test(dateString)) {
    date = new Date(dateString);
  } else if (brDatePattern.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    date = new Date(`${year}-${month}-${day}`);
  } else {
    throw new Error('Invalid date format');
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}