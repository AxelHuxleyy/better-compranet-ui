export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('es-ES');
};

export const formatDateTime = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString('es-ES');
};
