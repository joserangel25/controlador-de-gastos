export const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha  = Date.now().toString(36);
  return random + fecha;
}

//Formateador de fechas
const opciones = {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
}
export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
}
