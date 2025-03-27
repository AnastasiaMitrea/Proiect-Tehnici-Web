document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cards-container');
    const randomAdoptBtn = document.getElementById('randomAdoptBtn');

    Promise.all([
        fetch('/Json/cats.json').then(response => response.json()),
        fetch('/Json/filters.json').then(response => response.json())
    ])
        .then(([catsData, filters]) => {
            const ageSelect = document.getElementById('ageSelect');
            const genderSelect = document.getElementById('genderSelect');
            const furLengthSelect = document.getElementById('furLengthSelect');
            const locationSelect = document.getElementById('locationSelect');
            const timeSpentSelect = document.getElementById('timeSpentSelect');
            const applyButton = document.querySelector('.applyButton');
            const removeButton = document.getElementById('removeFiltersBtn');

            function populateSelect(selectElement, options) {
                options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    selectElement.appendChild(opt);
                });
            }

            populateSelect(ageSelect, filters.age);
            populateSelect(genderSelect, filters.gender);
            populateSelect(furLengthSelect, filters.furLength);
            populateSelect(locationSelect, filters.location);
            populateSelect(timeSpentSelect, filters.timeSpent);

            function displayCats(filteredCats) {
                container.innerHTML = '';
                filteredCats.forEach(cat => {
                    const card = document.createElement('div');
                    card.classList.add('adoptionElement');
                    card.innerHTML = `
                        <img src="${cat.imageUrl}" alt="Cat picture" class="adoptionPics">
                        <div class="adoptionText">
                            <h3>${cat.name}</h3>
                            <h4>${cat.breed} | ${cat.age} | ${cat.gender}</h4>
                            <h4>${cat.location}</h4>
                            <h4>Time spent: ${cat.timeSpent}</h4>
                            <a href="${cat.adoptionLink}">Adopt ${cat.name}</a>
                        </div>
                    `;
                    card.addEventListener('dblclick', function() {
                        maximizeCard(cat);
                    });
                    container.appendChild(card);
                });
            }

            function maximizeCard(cat) {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                        <img src="${cat.imageUrl}" alt="Cat picture" class="modal-pic">
                        <h3>${cat.name}</h3>
                        <h4>${cat.breed} | ${cat.age} | ${cat.gender}</h4>
                        <h4>${cat.location}</h4>
                        <h4>Time spent: ${cat.timeSpent}</h4>
                        <a href="${cat.adoptionLink}" target="_blank">Adopt ${cat.name}</a>
                    </div>
                `;
                document.body.appendChild(modal);

                const closeButton = modal.querySelector('.close-button');
                closeButton.addEventListener('click', function() {
                    modal.remove();
                });

                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            }

            function applyFilters() {
                const age = ageSelect.value;
                const gender = genderSelect.value;
                const furLength = furLengthSelect.value;
                const location = locationSelect.value;
                const timeSpent = timeSpentSelect.value;

                const filteredCats = catsData.filter(cat => {
                    const isMatchingAge = (age === "Any" || cat.age === age);
                    const isMatchingGender = (gender === "Any" || cat.gender === gender);
                    const isMatchingFurLength = (furLength === "Any" || cat.breed === furLength);
                    const isMatchingLocation = (location === "Any" || cat.location === location);
                    const isMatchingTimeSpent = (timeSpent === "Any" || cat.timeSpent === timeSpent);

                    return isMatchingAge && isMatchingGender && isMatchingFurLength && isMatchingLocation && isMatchingTimeSpent;
                });

                displayCats(filteredCats);
            }

            function removeFilters() {
                ageSelect.value = "Any";
                genderSelect.value = "Any";
                furLengthSelect.value = "Any";
                locationSelect.value = "Any";
                timeSpentSelect.value = "Any";

                displayCats(catsData);
            }

            function getRandomCat() {
                const randomIndex = Math.floor(Math.random() * catsData.length);
                const randomCat = catsData[randomIndex];
                maximizeCard(randomCat);
            }

            displayCats(catsData);

            applyButton.addEventListener('click', applyFilters);
            removeButton.addEventListener('click', removeFilters);
            randomAdoptBtn.addEventListener('click', getRandomCat);
        })
});
