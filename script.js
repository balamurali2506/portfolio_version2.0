// ===============================
// AOS Animation
// ===============================
AOS.init({
    duration: 1000,
    once: true
});


// ===============================
// Smooth Scroll
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===============================
// Auto Close Navbar on Mobile
// ===============================
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        if (
            navbarCollapse.classList.contains('show')
        ) {
            new bootstrap.Collapse(
                navbarCollapse
            ).hide();
        }
    });
});


// ===============================
// Active Navbar Link
// ===============================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
        ) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {

        link.classList.remove('active');

        if (
            link.getAttribute('href') ===
            `#${current}`
        ) {
            link.classList.add('active');
        }
    });
});


// ===============================
// EmailJS Configuration
// ===============================

// Replace these with YOUR values
const PUBLIC_KEY =
'5WA5VuFXHdJxT0gm_';

const SERVICE_ID =
'service_9z4k6dh';

const TEMPLATE_ID =
'template_xt3pdtj';


// Initialize EmailJS
emailjs.init(PUBLIC_KEY);


// ===============================
// Contact Form
// ===============================
const contactForm =
document.getElementById(
    'contact-form'
);

contactForm.addEventListener(
    'submit',
    function (e) {

        e.preventDefault();

        const submitBtn =
            contactForm.querySelector(
                'button'
            );

        submitBtn.innerHTML =
            'Sending...';

        submitBtn.disabled = true;

        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            this
        )
        .then(() => {

            submitBtn.innerHTML =
                'Message Sent ✓';

            alert(
                'Message sent successfully!'
            );

            contactForm.reset();

            setTimeout(() => {

                submitBtn.innerHTML =
                    'Send Message';

                submitBtn.disabled = false;

            }, 2500);
        })
        .catch(error => {

            console.error(
                'EmailJS Error:',
                error
            );

            alert(
                'Failed to send message. Check EmailJS setup.'
            );

            submitBtn.innerHTML =
                'Send Message';

            submitBtn.disabled = false;
        });
});


// ===============================
// Certificates Carousel
// ===============================
const certificateSlider = document.querySelector('.certificate-slider');
const nextBtn = document.getElementById('nextCertificate');
const prevBtn = document.getElementById('prevCertificate');

if (certificateSlider) {
    let autoScroll;
    const slideWidth = 320;

    function startAutoScroll() {
        autoScroll = setInterval(() => {
            const atEnd =
                certificateSlider.scrollLeft + certificateSlider.clientWidth >=
                certificateSlider.scrollWidth - 5;

            if (atEnd) {
                certificateSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                certificateSlider.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }, 3000);
    }

    function resetAutoScroll() {
        clearInterval(autoScroll);
        startAutoScroll();
    }

    startAutoScroll();

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            certificateSlider.scrollBy({ left: slideWidth, behavior: 'smooth' });
            resetAutoScroll();
        });

        prevBtn.addEventListener('click', () => {
            certificateSlider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            resetAutoScroll();
        });
    }
}

// ===============================
// Navbar Background on Scroll
// ===============================
window.addEventListener(
    'scroll',
    () => {

        const navbar =
            document.querySelector(
                '.custom-navbar'
            );

        if (
            window.scrollY > 50
        ) {
            navbar.style.background =
                'rgba(5,8,22,0.95)';
        } else {
            navbar.style.background =
                'rgba(10,10,10,0.85)';
        }
    }
);

// ===============================
// PDF Preview Renderer
// ===============================
async function renderPDFPreviews() {
    const pdfjsLib = await import(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs'
    );
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

    const canvases = document.querySelectorAll('.cert-preview');

    canvases.forEach(async (canvas) => {
        const pdfUrl = canvas.getAttribute('data-pdf');
        try {
            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
            const page = await pdf.getPage(1);

            const viewport = page.getViewport({ scale: 1 });
            const containerWidth = 320;
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            await page.render({
                canvasContext: canvas.getContext('2d'),
                viewport: scaledViewport
            }).promise;

        } catch (err) {
            console.error('PDF render error:', err);
        }
    });
}

renderPDFPreviews();