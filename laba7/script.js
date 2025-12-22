import { getRates } from './api.js';
import { saveSettings, getSettings } from './storage.js';



document.addEventListener('DOMContentLoaded', function() {
  const fromSelect = document.querySelector("#from-currency-select");
  const toSelect = document.querySelector("#to-currency-select");
  const quantityInput = document.querySelector("#quantity-input");
  const quantityOutput = document.querySelector("#quantity-output");

  const settings = getSettings();
  fromSelect.value = settings.from;
  toSelect.value = settings.to;

  async function updateResult() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(quantityInput.value) || 0;
    if (from === to) {
      quantityOutput.value = amount.toFixed(2);
      return;
    }
    const rates = await getRates(from);
    if (rates) {
      const rate = rates[to];
      const result = amount * rate;
      quantityOutput.value = result.toFixed(2);
    } else {
      quantityOutput.value = 'Ошибка';
    }
  }

  fromSelect.addEventListener('change', function() {
    saveSettings({ from: fromSelect.value, to: toSelect.value });
    updateResult();
  });
  toSelect.addEventListener('change', function() {
    saveSettings({ from: fromSelect.value, to: toSelect.value });
    updateResult();
  });

  quantityInput.addEventListener('input', function() {
    updateResult();
  });

  updateResult();
});
