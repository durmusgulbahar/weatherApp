
export async function getWeather(city:string) {
  const url = `http://localhost:5000/api/v1/${city}`;

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
