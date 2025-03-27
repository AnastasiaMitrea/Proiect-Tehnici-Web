document.addEventListener('DOMContentLoaded', function() {
    const locationsContainer = document.getElementById('locations');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../Json/contact.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const locations = JSON.parse(xhr.responseText);
            locations.forEach(location => {
                const card = document.createElement('div');
                card.classList.add('location-card');
                card.innerHTML = `
          <h3>${location.city}</h3>
          <p><strong>Address:</strong> ${location.address}</p>
          <p><strong>Email:</strong> ${location.email}</p>
          <p><strong>Phone:</strong> ${location.phone}</p>
        `;
                locationsContainer.appendChild(card);
            });
        }
    };
    xhr.send();
});
