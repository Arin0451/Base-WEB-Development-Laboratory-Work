export function saveSettings(settings) {
  localStorage.setItem('currencySettings', JSON.stringify(settings));
}

export function getSettings() {
  const data = localStorage.getItem('currencySettings');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing settings:', e);
    }
  }

  return { from: 'USD', to: 'RUB' };
}
