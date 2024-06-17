document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.querySelector('.email');
    const emailInput = emailForm ? emailForm.querySelector('input[type="email"]') : null;
    const signInButton = document.getElementById('button2');
    const languageButton = document.getElementById('button1');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');

    if (emailForm) {
        emailForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                createOrRestartMembership(email);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            window.location.href = 'signin.html';
        });
    }

    if (languageButton) {
        languageButton.addEventListener('click', () => {
            changeLanguage();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            } else {
                alert('Please enter a search term.');
            }
        });
    }

    if (searchResultsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');

        if (query) {
            performSearch(query);
        }
    }

    if (window.location.pathname.endsWith('content.html')) {
        displayContentDetails();
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function createOrRestartMembership(email) {
        console.log(`Email ${email} submitted for membership creation or restart.`);
        alert(`Welcome! Membership for ${email} has been created or restarted.`);
    }

    function changeLanguage() {
        const currentLanguage = languageButton.textContent;
        const newLanguage = currentLanguage === 'English' ? 'Spanish' : 'English';
        languageButton.textContent = newLanguage;
        alert(`Language changed to ${newLanguage}`);
    }

    function performSearch(query) {
        console.log(`Performing search for: ${query}`);
        
        const searchResults = [
            { title: 'Movie 1', imgSrc: 'images/movie1.jpg' },
            { title: 'Movie 2', imgSrc: 'images/movie2.jpg' },
            { title: 'Series 1', imgSrc: 'images/series1.jpg' },
            { title: 'Recommended 1', imgSrc: 'images/recommended1.jpg' }
        ];

        
        searchResultsContainer.innerHTML = '';

        
        searchResults.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('search-result');
            resultDiv.innerHTML = `
                <img src="${result.imgSrc}" alt="${result.title}">
                <p>${result.title}</p>
            `;
            searchResultsContainer.appendChild(resultDiv);
        });
    }

    function displayContentDetails() {
        
        const contentTitle = document.getElementById('contentTitle');
        const contentImage = document.getElementById('contentImage');
        const contentDescription = document.getElementById('contentDescription');
        const contentCast = document.getElementById('contentCast');
        const contentGenre = document.getElementById('contentGenre');

       
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title');
        const imgSrc = urlParams.get('imgSrc');
        const description = urlParams.get('description');
        const cast = urlParams.get('cast');
        const genre = urlParams.get('genre');

        
        contentTitle.textContent = title;
        contentImage.src = imgSrc;
        contentDescription.textContent = description;
        contentCast.textContent = `Cast: ${cast}`;
        contentGenre.textContent = `Genre: ${genre}`;
    }
    
function handleContentClick(title, imgSrc, description, cast, genre) {
    const queryString = `?title=${encodeURIComponent(title)}&imgSrc=${encodeURIComponent(imgSrc)}&description=${encodeURIComponent(description)}&cast=${encodeURIComponent(cast)}&genre=${encodeURIComponent(genre)}`;
    const url = `content.html${queryString}`;
    window.location.href = url; 
}


const thumbnails = document.querySelectorAll('.content-thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        
        const title = thumbnail.getAttribute('data-title');
        const imgSrc = thumbnail.getAttribute('data-img-src');
        const description = thumbnail.getAttribute('data-description');
        const cast = thumbnail.getAttribute('data-cast');
        const genre = thumbnail.getAttribute('data-genre');

        
        handleContentClick(title, imgSrc, description, cast, genre);
    });
});

});
