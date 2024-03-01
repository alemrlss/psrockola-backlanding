//@Author: Alejandro Morales 06/02/2024
export default function convertMilisecondsToTime(
  durationInMilliseconds: number | null
): string | null {
  if (durationInMilliseconds === null) {
    return null;
  }

  const fecha = new Date(durationInMilliseconds);

  const horas = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();
  const segundos = fecha.getUTCSeconds();

  const formatoTiempo =
    [
      horas > 0 ? String(horas).padStart(2, "0") : null,
      String(minutos).padStart(2, "0"),
      String(segundos).padStart(2, "0"),
    ]
      .filter((value) => value !== null) // Filtrar valores nulos
      .join(":") || "00:00"; // Si todos los componentes son nulos, devuelve "00:00"

  return formatoTiempo;
}
