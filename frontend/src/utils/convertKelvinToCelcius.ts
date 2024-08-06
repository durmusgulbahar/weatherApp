export function convertKelvinToCelcius(kelvin: number|undefined) {
  return kelvin ? Math.round(kelvin - 273.15) : 0;
}