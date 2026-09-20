
// Events cards
const festivalEvents = [
    {
        title: "Traditional Fan Painting",
        time: "1pm - 2pm",
        date: "Saturday, 4 Oct",
        description: "Learn the historical art of fan painting with professional artists!",
    },
    {
        title: "Mooncake Picnic",
        time: "3pm - 4pm",
        date: "Sunday, 5 Oct",
        description: "Come try a variety of mooncakes in our beautiful garden setting!",
    },
    {
        title: "DIY Lantern Making",
        time: "5pm - 7pm",
        date: "Monday, 6 Oct",
        description: "Create your own festival lantern with our provided materials!",
    },
    {
        title: "Shadow Puppet Show",
        time: "8pm",
        date: "Monday, 6 Oct",
        description: "Watch an exclusive shadow puppet performance about the Legend of Chang'e!",
    }
];

// render event cards
function renderEvents() {
    const container = document.getElementById('events-container');
    
    if (!container) {
        console.log("events on form page");
        return; 
    }
    
    container.innerHTML = '';
    
    for (let i = 0; i < festivalEvents.length; i++) {
        const event = festivalEvents[i];
        
        const cardContent = `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-primary">
                    <div class="card-header bg-primary text-white text-center">
                        <strong>${event.title}</strong>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-2">
                            <i class="me-2 text-muted">Date: </i>
                            <span>${event.date}</span>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <i class="me-2 text-muted">Time: </i>
                            <span>${event.time}</span>
                        </div>
                        <p class="card-text">${event.description}</p>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += cardContent;
    }
}

// dark light mode toggle
function initialTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function themeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    
    if (!themeToggle || !themeText) {
        return;
    }

    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // toggle ON for light / OFF for dark
    if (isDarkMode) {
        themeToggle.checked = false; 
        themeText.textContent = 'Dark Theme';
    } else {
        themeToggle.checked = true;  
        themeText.textContent = 'Light Theme';
    }
    
    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            document.body.classList.remove('dark-mode');
            themeText.textContent = 'Light Theme';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            themeText.textContent = 'Dark Theme';
            localStorage.setItem('theme', 'dark');
        }
    });
}

initialTheme();

// form 
function festivalForm() {
    const form = document.getElementById("festivalForm");

    if (!form) {
        console.log('Not on the form page');
        return; 
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        clearErrors();
        
        const validForm = validateForm();

        if (validForm) {
            showSuccess();
        } else {
            console.log('form error');
        }
    });
}

function clearErrors() {
    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('dayError').textContent = '';
    document.getElementById('termsError').textContent = '';
}

// form validation
function validateForm() {
    let formIsValid = true;
    
    const firstName = document.getElementById('firstName').value.trim();
    if (firstName === '') {
        document.getElementById('firstNameError').textContent = 'First name is required.';
        formIsValid = false;
    }
    
    const lastName = document.getElementById('lastName').value.trim();
    if (lastName === '') {
        document.getElementById('lastNameError').textContent = 'Last name is required.';
        formIsValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        formIsValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = 'Email must be valid: name@example.com';
        formIsValid = false;
    }
    
    const day = document.getElementById('day').value;
    if (day === '') {
        document.getElementById('dayError').textContent = 'Please select a day.';
        formIsValid = false;
    }
    
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the terms & conditions.';
        formIsValid = false;
    }
    
    return formIsValid; 
}

// submission confirmation
function showSuccess() {
    const cfmMessage = document.getElementById('cfmMessage');
    const submitButton = document.querySelector("button[type='submit']");
    const form = document.getElementById("festivalForm");
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    
    setTimeout(function() {
        cfmMessage.innerHTML = "<p>Form successfully submitted!</p>";
        
        submitButton.innerHTML = "Submit";
        
        // reset to default
        setTimeout(function() {
            form.reset();
            cfmMessage.innerHTML = '';
            submitButton.disabled = false;
        }, 3000);
    }, 3000);
}

// character counter 
function charCounter() {
    const dietary = document.getElementById('dietary');
    const dietaryCounter = document.getElementById('dietaryCount');
    
    if (dietary && dietaryCounter) {
        dietary.addEventListener('input', function() {
            const characterCount = dietary.value.length;
            dietaryCounter.textContent = characterCount;
        });
    }
    
    const comments = document.getElementById('comments');
    const commentsCounter = document.getElementById('commentsCount');
    
    if (comments && commentsCounter) {
        comments.addEventListener('input', function() {
            const characterCount = comments.value.length;
            commentsCounter.textContent = characterCount;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // events card
    renderEvents();

    // dark light mode
    themeToggle();

    // form functions
    festivalForm();
    charCounter(); 
});

// confetti effect
function createConfetti(x, y, colours) {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colours[Math.floor(Math.random() * colours.length)]};
            top: ${y}px;
            left: ${x}px;
            z-index: 9999;
            pointer-events: none;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        const angle = (Math.random() * 360) * Math.PI / 180;
        const velocity = Math.random() * 300 + 100;
        const gravity = 500;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const x_pos = x + Math.cos(angle) * velocity * elapsed;
            const y_pos = y + Math.sin(angle) * velocity * elapsed + 0.5 * gravity * elapsed * elapsed;
            
            confetti.style.left = x_pos + 'px';
            confetti.style.top = y_pos + 'px';
            confetti.style.opacity = Math.max(0, 1 - elapsed / 2);
            confetti.style.transform = `rotate(${Math.random() * 360 + elapsed * 200}deg) scale(${1 - elapsed/3})`;
            
            if (elapsed < 2 && y_pos < window.innerHeight + 100) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

setTimeout(function() {
    if (!document.querySelector('.highlights')) {
        return; 
    }

    var cards = document.querySelectorAll('.card');
    if (cards.length === 0) {
        cards = document.querySelectorAll('.col');
    }
    if (cards.length === 0) {
        cards = document.querySelectorAll('[class*="card"]');
    }
    
    for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        card.onclick = function(event) {
            var x = event.clientX;
            var y = event.clientY;
            
            let colours = ['#FFD700', '#FFA500', '#FF6347', '#FF4500', '#FF0000', '#FF69B4', '#00BFFF', '#9370DB'];
            
            createConfetti(x, y, colours);
        };
        
        card.onmouseenter = function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.2s';
        };
        
        card.onmouseleave = function() {
            this.style.transform = 'translateY(0px)';
        };
    }
}, 1000)








// Backup setup for theme toggle 
window.addEventListener('load', function() {
    console.log('Window loaded - backup theme setup');
    themeToggle();
});