export async function getRates(base) {
  const url = `https://open.er-api.com/v6/latest/${base}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.result === 'success') {
      return data.rates;
    } else {
      throw new Error('Ошибка в получении курсов');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
