
export async function getWeather(city:string) {
  const url = `https://weather-api.durmusgulbahar.dev/api/v1/${city}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data)
  return data;
}
