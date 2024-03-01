//@Autor Alejandro Morales 06/02/2024
export default function convertDurationYoutubeToMiliseconds(
  durationRaw: string
): number | null {
  const matches = durationRaw.match(/P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);

  if (!matches) {
    throw new Error("Formato de duración no válido.");
  }

  const days = matches[1] ? parseInt(matches[1], 10) * 24 * 60 * 60 * 1000 : 0;
  const hours = matches[2] ? parseInt(matches[2], 10) * 60 * 60 * 1000 : 0;
  const minutes = matches[3] ? parseInt(matches[3], 10) * 60 * 1000 : 0;
  const seconds = matches[4] ? parseInt(matches[4], 10) * 1000 : 0;

  return days + hours + minutes + seconds;
}
