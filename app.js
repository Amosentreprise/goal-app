// app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weeklyForm');
    const notification = document.getElementById('notification');
  
    // Charger les données depuis localStorage
    const savedData = JSON.parse(localStorage.getItem('fiche_hebdomadaire'));
    if (savedData) {
      for (const [key, value] of Object.entries(savedData)) {
        const field = form.elements.namedItem(key);
        if (field) field.value = value;
      }
    }
  
    // Sauvegarder les données
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const data = {};
      for (const field of form.elements) {
        if (field.name) {
          data[field.name] = field.value;
        }
      }
  
      localStorage.setItem('fiche_hebdomadaire', JSON.stringify(data));
  
      // Message de confirmation
      notification.textContent = '✅ Données sauvegardées avec succès !';
      setTimeout(() => {
        notification.textContent = '';
      }, 3000);
    });
  });
  