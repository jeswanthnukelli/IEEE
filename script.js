// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize theme
    initializeTheme();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize weather
    updateWeather();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize charts if on innovations page
    if (document.getElementById('soilChart')) {
        initializeCharts();
    }
    
    // Initialize contact form if on contact page
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }
    
    // Start counter animations
    startCounterAnimations();
    
    // Initialize efficiency bars animation
    animateEfficiencyBars();
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Navigation
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Weather Widget (Mocked Data)
function updateWeather() {
    const weatherData = {
        temperature: Math.floor(Math.random() * (35 - 20) + 20),
        humidity: Math.floor(Math.random() * (80 - 50) + 50),
        windSpeed: Math.floor(Math.random() * (20 - 5) + 5),
        conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Clear']
    };
    
    const tempElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('windSpeed');
    const conditionElement = document.getElementById('condition');
    
    if (tempElement) tempElement.textContent = weatherData.temperature;
    if (humidityElement) humidityElement.textContent = weatherData.humidity;
    if (windSpeedElement) windSpeedElement.textContent = weatherData.windSpeed;
    if (conditionElement) {
        const randomCondition = weatherData.conditions[Math.floor(Math.random() * weatherData.conditions.length)];
        conditionElement.textContent = randomCondition;
    }
    
    // Update every 10 seconds for demo
    setTimeout(updateWeather, 10000);
}

// Counter Animations
function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .impact-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Efficiency Bars Animation
function animateEfficiencyBars() {
    const bars = document.querySelectorAll('.bar-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    bars.forEach(bar => observer.observe(bar));
}

// AI Crop Suggestion
function suggestCrops() {
    const soilType = document.getElementById('soilType').value;
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const resultDiv = document.getElementById('predictionResult');
    
    if (!soilType || !rainfall || !temperature) {
        alert('Please fill in all fields');
        return;
    }
    
    let crops = [];
    let recommendations = '';
    
    // AI Logic for crop suggestions
    if (soilType === 'loamy') {
        if (rainfall > 500 && temperature > 20) {
            crops = ['Rice', 'Sugarcane', 'Cotton', 'Wheat'];
            recommendations = 'Excellent conditions for water-intensive crops. Consider rice or sugarcane for maximum yield.';
        } else if (rainfall <= 500) {
            crops = ['Wheat', 'Barley', 'Pulses', 'Vegetables'];
            recommendations = 'Moderate rainfall suits wheat and vegetables. Implement drip irrigation for better results.';
        }
    } else if (soilType === 'sandy') {
        if (rainfall > 400) {
            crops = ['Millets', 'Groundnut', 'Watermelon', 'Cucumber'];
            recommendations = 'Sandy soil with good drainage. Perfect for drought-resistant crops like millets.';
        } else {
            crops = ['Millets', 'Bajra', 'Cactus', 'Date Palm'];
            recommendations = 'Low rainfall with sandy soil requires drought-resistant varieties. Consider millets or bajra.';
        }
    } else if (soilType === 'clay') {
        if (rainfall > 600 && temperature > 25) {
            crops = ['Rice', 'Soybean', 'Cotton', 'Maize'];
            recommendations = 'Clay soil retains water well. Ideal for rice cultivation with proper drainage management.';
        } else {
            crops = ['Wheat', 'Chickpea', 'Sunflower', 'Mustard'];
            recommendations = 'Clay soil in moderate conditions. Focus on crops that tolerate moisture retention.';
        }
    } else if (soilType === 'silt') {
        crops = ['Vegetables', 'Fruits', 'Wheat', 'Corn'];
        recommendations = 'Silt soil is fertile and holds moisture well. Excellent for vegetables and fruits.';
    } else if (soilType === 'peaty') {
        crops = ['Vegetables', 'Berries', 'Root Crops', 'Oats'];
        recommendations = 'Peaty soil is acidic and organic-rich. Perfect for root vegetables and berries.';
    }
    
    // Display results
    resultDiv.innerHTML = `
        <div class="result-content">
            <h3><i class="fas fa-check-circle"></i> Recommended Crops</h3>
            <ul class="crop-suggestions">
                ${crops.map(crop => `<li><i class="fas fa-seedling"></i> ${crop}</li>`).join('')}
            </ul>
            <p style="color: var(--text-light); line-height: 1.8;">
                <strong>Analysis:</strong> ${recommendations}
            </p>
            <div style="margin-top: 1.5rem; padding: 1rem; background: var(--white); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
                <strong style="color: var(--primary-color);">Conditions:</strong>
                <ul style="margin-top: 0.5rem; color: var(--text-dark); list-style: none;">
                    <li><i class="fas fa-layer-group" style="color: var(--primary-color);"></i> Soil: ${soilType.charAt(0).toUpperCase() + soilType.slice(1)}</li>
                    <li><i class="fas fa-cloud-rain" style="color: var(--primary-color);"></i> Rainfall: ${rainfall}mm</li>
                    <li><i class="fas fa-temperature-half" style="color: var(--primary-color);"></i> Temperature: ${temperature}°C</li>
                </ul>
            </div>
        </div>
    `;
}

// Initialize Charts
function initializeCharts() {
    // Soil Nutrient Chart
    const soilCtx = document.getElementById('soilChart');
    if (soilCtx) {
        new Chart(soilCtx, {
            type: 'radar',
            data: {
                labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'pH Level', 'Moisture', 'Organic Matter'],
                datasets: [{
                    label: 'Current Levels',
                    data: [75, 68, 82, 70, 85, 78],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 2
                }, {
                    label: 'Optimal Levels',
                    data: [80, 75, 85, 75, 80, 80],
                    backgroundColor: 'rgba(135, 206, 235, 0.2)',
                    borderColor: 'rgba(135, 206, 235, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Water Usage Chart
    const waterCtx = document.getElementById('waterChart');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'bar',
            data: {
                labels: ['Traditional', 'Smart Irrigation', 'Savings'],
                datasets: [{
                    label: 'Water Usage (Liters/day)',
                    data: [1000, 600, 400],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Yield Chart
    const yieldCtx = document.getElementById('yieldChart');
    if (yieldCtx) {
        new Chart(yieldCtx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Traditional Farming',
                    data: [100, 105, 103, 108, 110, 112],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Smart Farming',
                    data: [100, 115, 125, 138, 145, 155],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 90
                    }
                }
            }
        });
    }
}

// Contact Form Validation
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('nameError', 'Please enter your name');
            name.classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('emailError', 'Please enter your email');
            email.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            email.classList.add('error');
            isValid = false;
        }
        
        // Validate subject
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showError('subjectError', 'Please select a subject');
            subject.classList.add('error');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('messageError', 'Please enter your message');
            message.classList.add('error');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            message.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Show success modal
            document.getElementById('successModal').classList.add('show');
            form.reset();
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.feature-card, .mission-card, .importance-item, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});
