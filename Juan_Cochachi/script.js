document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Efecto de escritura para el nombre
    const nombre = document.querySelector('.nombre-animado');
    const nombres = ['Juan Jose Cochachi Taza', 'Desarrollador Web', 'Estudiante de la universidad Continental', 'Apasionado por la Tecnología'];
    let currentIndex = 0;
    let isDeleting = false;
    let text = '';
    let delta = 300; // Velocidad de escritura
    
    function typeWriter() {
        const currentText = nombres[currentIndex];
        
        if (isDeleting) {
            // Efecto de borrado
            text = currentText.substring(0, text.length - 1);
            delta = 100; // Velocidad más rápida para borrar
        } else {
            // Efecto de escritura
            text = currentText.substring(0, text.length + 1);
            delta = 200 - Math.random() * 200; // Variación en la velocidad
        }
        
        nombre.innerHTML = text + '<span class="cursor" aria-hidden="true">|</span>';
        
        if (!isDeleting && text === currentText) {
            // Pausa al final de la escritura
            delta = 2000;
            isDeleting = true;
        } else if (isDeleting && text === '') {
            // Cambiar al siguiente texto
            isDeleting = false;
            currentIndex = (currentIndex + 1) % nombres.length;
            delta = 500; // Pausa antes de empezar a escribir
        }
        
        setTimeout(typeWriter, delta);
    }
    
    // Iniciar el efecto de escritura
    setTimeout(typeWriter, 1000);
    
    //Efecto de desplazamiento de la barra de navegación
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú en móviles
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Inicializar particulas.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Función para igualar alturas de las tarjetas
    function equalizeCardHeights() {
        const infoCard = document.querySelector('.info-card');
        const skillsCard = document.querySelector('.skills-card');
        
        if (infoCard && skillsCard) {
            // Resetear alturas primero
            infoCard.style.minHeight = 'auto';
            skillsCard.style.minHeight = 'auto';
            
            // Obtener la altura más grande
            const infoHeight = infoCard.offsetHeight;
            const skillsHeight = skillsCard.offsetHeight;
            const maxHeight = Math.max(infoHeight, skillsHeight);
            
            // Aplicar la altura mínima a ambos
            infoCard.style.minHeight = `${maxHeight}px`;
            skillsCard.style.minHeight = `${maxHeight}px`;
        }
    }

    // Ejecutar al cargar
    window.addEventListener('load', function() {
        equalizeCardHeights();
        
        // Asegurar que se mantenga después de animaciones
        setTimeout(equalizeCardHeights, 500);
    });

    // Ejecutar al redimensionar (con debounce para mejor actuación)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(equalizeCardHeights, 200);
    });

    // Observador para la sección "Sobre mí"
    const sobreMiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(equalizeCardHeights, 300);
            }
        });
    }, { threshold: 0.1 });

    const sobreMiSection = document.querySelector('#sobre-mi');
    if (sobreMiSection) {
        sobreMiObserver.observe(sobreMiSection);
    }

    // Animación de habilidades al aparecer
    const skillBars = document.querySelectorAll('.progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'sobre-mi') {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Efecto parallax en seccion heroe
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Actualizar año en el footer
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// Función para detectar si el dispositivo es móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// Funcionalidad para MIS PROYECTOS
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    proyectoCards.forEach(card => {
        // Efecto de profundidad al mover el mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        // Resetear al salir del mouse
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Efecto de luz dinámica
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Modal para vista ampliada de proyectos
    document.querySelectorAll('.proyecto-overlay a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.proyecto-card');
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('p').textContent;
            const technologies = [...card.querySelectorAll('.tech-tags .badge')]
                .map(badge => badge.textContent)
                .join(', ');
            
            // Crear modal dinámico
            const modalHTML = `
                <div class="modal fade" id="proyectoModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content glass-card">
                            <div class="modal-header border-0">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6 mb-4 mb-md-0">
                                        <img src="${imgSrc}" alt="${title}" class="img-fluid rounded">
                                    </div>
                                    <div class="col-md-6">
                                        <h6>Descripción</h6>
                                        <p>${description}</p>
                                        <h6 class="mt-4">Tecnologías</h6>
                                        <p>${technologies}</p>
                                        <h6 class="mt-4">Detalles</h6>
                                        <p>Esto lo desarrollé al paso de los dias e inbestigando sobre lo relacionado y tambien tube ayudas con la IA para poder concluir sobre los diseños</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer border-0">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <a href="#" class="btn btn-primary">Ver Proyecto</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Insertar modal en el DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById('proyectoModal'));
            modal.show();
            
            // Eliminar modal al cerrar
            document.getElementById('proyectoModal').addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
        });
    });

    // Insertar botones de filtro si existe la sección de proyectos
    const proyectosSection = document.querySelector('.proyectos-section .container');
    if (proyectosSection) {
        proyectosSection.insertBefore(filterButtons, proyectosSection.querySelector('.row'));
        
        // Funcionalidad de filtrado
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', function() {
                // Actualizar botón activo
                document.querySelectorAll('[data-filter]').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const proyectos = document.querySelectorAll('.proyecto-card');
                
                proyectos.forEach(proyecto => {
                    if (filter === 'all') {
                        proyecto.style.display = 'block';
                    } else {
                        const hasTech = proyecto.querySelector(`.badge.bg-${filter}`);
                        proyecto.style.display = hasTech ? 'block' : 'none';
                    }
                });
                
                // Re-trigger AOS para animaciones
                AOS.refresh();
            });
        });
    }