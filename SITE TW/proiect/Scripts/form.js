document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.adoptionForm');
    const formWrap = document.querySelector('#applicationFormWrap');
    const homeField = document.querySelector('#home');
    const landlordNameField = document.querySelector('#landlord-name-field');
    const landlordPhoneField = document.querySelector('#landlord-phone-field');
    landlordNameField.style.display = 'none';
    landlordPhoneField.style.display = 'none';
    homeField.addEventListener('change', function() {
        if (homeField.value === 'rent') {
            landlordNameField.style.display = 'block';
            landlordPhoneField.style.display = 'block';
        } else {
            landlordNameField.style.display = 'none';
            landlordPhoneField.style.display = 'none';
        }
    });
    if (homeField.value==='rent') {
        landlordNameField.style.display='block';
        landlordPhoneField.style.display='block';
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.querySelector('#phone').value;
        const phoneRegex = /^\d{4}-\d{3}-\d{3}$/;
        if (!phoneRegex.test(phone)) {
            alert("Invalid phone number format. Please use XXXX-XXX-XXX.");
            return;
        }
        const email=document.querySelector('#email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            alert("Please enter a valid email address.");
            return;
        }
        const dateFormular={
            name:document.querySelector('#name').value,
            catName:document.querySelector('#cat-name').value,
            phone:phone,
            email:email,
            address:document.querySelector('#address').value,
            idPic:document.querySelector('#id-pic').value,
            adults:document.querySelector('#adults').value,
            children:document.querySelector('#children').value,
            home:document.querySelector('#home').value,
            landlordName:document.querySelector('#landlord-name').value,
            landlordPhone:document.querySelector('#landlord-phone').value,
            pets:document.querySelector('#pets').value,
            lifestyle:document.querySelector('#lifestyle').value,
            peopleHome:document.querySelector('#people-home').value,
            hoursAway:document.querySelector('#hours-away').value
        };
        localStorage.setItem('adoptionFormData', JSON.stringify(dateFormular));
        alert('Saved to localStorage.');
        const mesaj=document.querySelector('.mesaj-succes');
        if (mesaj) mesaj.remove();
        let succes=document.createElement('p');
        succes.textContent = "Thank you for your application!";
        succes.classList.add('mesaj-succes');
        formWrap.appendChild(succes);
        setTimeout(() => {
            succes.remove();
        }, 3000);
        setTimeout(() => {
            alert("Your application was submitted successfully!");
        }, 3000);
    });
    document.querySelectorAll('.formField input, .formField select').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00FF00 !important';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '#C90060';
        });
    });
    const nameInput = document.querySelector('#name');
    nameInput.addEventListener('input', function() {
        let charCount = document.getElementById('charCounter');
        if (!charCount) {
            charCount = document.createElement('p');
            charCount.id = 'charCounter';
            charCount.style.color = '#C90060';
            this.parentNode.appendChild(charCount);
        }
        charCount.textContent = `Characters: ${this.value.length}`;
    });
    formWrap.addEventListener('mouseenter', function() {
        this.classList.add('highlight');
    });
    formWrap.addEventListener('mouseleave', function() {
        this.classList.remove('highlight');
    });
});
