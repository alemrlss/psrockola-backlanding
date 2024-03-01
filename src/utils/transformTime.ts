export const transformTime = (minutos: number): string => {
  console.log(minutos);

  // Calcular horas, minutos y segundos
  let horas = Math.floor(minutos / 60);
  let minutosRestantes = Math.floor(minutos) % 60;
  let segundos = Math.round((minutos % 1) * 60);

  // Formatear a 'HH:MM:SS'
  const formatoHora = `${agregarCeros(horas)}:${agregarCeros(
    Math.floor(minutos)
  )}:${agregarCeros(segundos)}`;

  return formatoHora;
};

const agregarCeros = (valor: number): string => {
  // Agregar un cero delante si el valor es menor que 10
  return valor < 10 ? '0' + valor : valor.toString();
};
