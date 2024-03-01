//@Autor Alejandro Morales 06/02/2024
export default function calculatePriceByDuration(duration: number): number {
  // Duration / 240000 (4 minutes in ms)
  // Redondear hacia arriba al valor entero más cercano si el decimal es mayor a 0.1

  const operation = duration / 240000;
  const roundedBlocks = Math.ceil(operation - 0.1);

  return roundedBlocks;
}
