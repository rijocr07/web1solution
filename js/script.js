/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3A
  Initialization + Navbar + Navigation
==================================================*/

"use strict";

/*==================================================
DOM Ready
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initStickyNavbar();

    initMobileNavbar();

    initSmoothScroll();

    initActiveNavigation();

    initScrollProgress();

    initCurrentYear();

});

/*==================================================
Preloader
==================================================*/

function initPreloader() {

    const preloader = document.querySelector(".preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        preloader.classList.add("loaded");

        setTimeout(() => {

            preloader.remove();

        }, 600);

    });

}

/*==================================================
Sticky Navbar
==================================================*/

function initStickyNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    function navbarScroll() {

        if (window.scrollY > 80) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    }

    navbarScroll();

    window.addEventListener("scroll", navbarScroll);

}

/*==================================================
Mobile Navbar
==================================================*/

function initMobileNavbar() {

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const collapse = document.querySelector(".navbar-collapse");

    if (!collapse) return;

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (collapse.classList.contains("show")) {

                bootstrap.Collapse.getInstance(collapse)?.hide();

            }

        });

    });

}

/*==================================================
Smooth Scrolling
==================================================*/

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function(e){

            const targetID = this.getAttribute("href");

            if(targetID === "#") return;

            const target = document.querySelector(targetID);

            if(!target) return;

            e.preventDefault();

            const offset = 80;

            const top = target.offsetTop - offset;

            window.scrollTo({

                top,

                behavior:"smooth"

            });

        });

    });

}

/*==================================================
Active Navigation
==================================================*/

function initActiveNavigation() {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if(!sections.length) return;

    function updateActiveLink(){

        let current = "";

        sections.forEach(section=>{

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);

}

/*==================================================
Scroll Progress Bar
==================================================*/

function initScrollProgress(){

    const progress = document.querySelector(".scroll-progress");

    if(!progress) return;

    function updateProgress(){

        const totalHeight =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const progressHeight =

            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressHeight + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

}

/*==================================================
Current Year
==================================================*/

function initCurrentYear(){

    const year = document.querySelector("#currentYear");

    if(!year) return;

    year.textContent = new Date().getFullYear();

}

/*==================================================
Window Resize Fix
==================================================*/

window.addEventListener("resize", () => {

    const collapse = document.querySelector(".navbar-collapse");

    if (!collapse) return;

    if (window.innerWidth >= 992) {

        collapse.classList.remove("show");

    }

});

/*==================================================
Escape Key closes mobile menu
==================================================*/

document.addEventListener("keydown", (e)=>{

    if(e.key !== "Escape") return;

    const collapse=document.querySelector(".navbar-collapse");

    if(!collapse) return;

    if(collapse.classList.contains("show")){

        bootstrap.Collapse.getInstance(collapse)?.hide();

    }

});

/*==================================================
Prevent Empty Anchor Click
==================================================*/

document.querySelectorAll('a[href="#"]').forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

    });

});

/*==================================================
End of Part 3A
==================================================*/
/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3B.1
  Scroll Reveal + Intersection Observer
  Progress Bar Animation
==================================================*/

/*==================================================
Initialize
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

    initProgressBars();

});

/*==================================================
Scroll Reveal
==================================================*/

function initScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".reveal, \
        .hero-content,\
        .hero-image,\
        .trust-item,\
        .problem-card,\
        .feature-card,\
        .process-item,\
        .pricing-card,\
        .website-content,\
        .website-visual,\
        .testimonial-card,\
        .accordion-item,\
        .contact-card,\
        .contact-form,\
        .footer"
    );

    if (!revealElements.length) return;

    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(60px)";
        element.style.transition =
            "opacity .8s ease, transform .8s cubic-bezier(.22,.61,.36,1)";

    });

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"

        }

    );

    revealElements.forEach((element) => {

        observer.observe(element);

    });

}

/*==================================================
Reveal Delay
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(

        ".feature-card,\
        .pricing-card,\
        .testimonial-card,\
        .process-item"

    );

    cards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 120}ms`;

    });

});

/*==================================================
Progress Bars
==================================================*/

function initProgressBars() {

    const bars = document.querySelectorAll(

        ".performance-fill,\
        .progress-fill,\
        .skill-progress span,\
        .process-progress span"

    );

    if (!bars.length) return;

    bars.forEach((bar) => {

        const width =
            bar.dataset.width ||
            bar.style.width ||
            "100%";

        bar.style.width = "0";

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    requestAnimationFrame(() => {

                        bar.style.transition =
                            "width 1.8s cubic-bezier(.22,.61,.36,1)";

                        bar.style.width = width;

                    });

                    observer.unobserve(bar);

                });

            },

            {

                threshold: 0.4

            }

        );

        observer.observe(bar);

    });

}

/*==================================================
Fade Up Utility
==================================================*/

function fadeUp(element, delay = 0) {

    element.style.opacity = "0";

    element.style.transform = "translateY(40px)";

    element.style.transition =
        `all .8s cubic-bezier(.22,.61,.36,1) ${delay}ms`;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                element.style.opacity = "1";

                element.style.transform = "translateY(0)";

                observer.unobserve(element);

            });

        },

        {

            threshold: 0.2

        }

    );

    observer.observe(element);

}

/*==================================================
Apply Fade Utility
==================================================*/

document.querySelectorAll(".fade-up").forEach((element, index) => {

    fadeUp(element, index * 100);

});

/*==================================================
Image Reveal
==================================================*/

const imageObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("image-visible");

            imageObserver.unobserve(entry.target);

        });

    },

    {

        threshold: 0.2

    }

);

document.querySelectorAll(".image-reveal").forEach((image) => {

    imageObserver.observe(image);

});

/*==================================================
Section Active Animation
==================================================*/

const sectionObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("section-active");

            }

        });

    },

    {

        threshold: 0.25

    }

);

document.querySelectorAll("section").forEach((section) => {

    sectionObserver.observe(section);

});

/*==================================================
End of Part 3B.1
==================================================*/
/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3B.2
  Animated Counters + Typing Effect
  Hero Parallax + Floating Animations
==================================================*/

/*==================================================
Initialize
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initCounters();

    initTypingEffect();

    initHeroParallax();

    initFloatingElements();

});

/*==================================================
Animated Counters
==================================================*/

function initCounters() {

    const counters = document.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.count);

            const duration = 1800;

            const start = 0;

            let startTime = null;

            function animate(time) {

                if (!startTime) startTime = time;

                const progress = Math.min((time - startTime) / duration, 1);

                const value = Math.floor(progress * (target - start) + start);

                counter.textContent = value.toLocaleString();

                if (progress < 1) {

                    requestAnimationFrame(animate);

                } else {

                    counter.textContent = target.toLocaleString();

                }

            }

            requestAnimationFrame(animate);

            observer.unobserve(counter);

        });

    }, {

        threshold: .5

    });

    counters.forEach(counter => observer.observe(counter));

}

/*==================================================
Typing Effect
==================================================*/

function initTypingEffect() {

    const element = document.querySelector(".typing-text");

    if (!element) return;

    const words = [

        "Modern Websites",

        "Fast Websites",

        "SEO Ready Websites",

        "High Converting Websites",

        "Beautiful Websites"

    ];

    let wordIndex = 0;

    let letterIndex = 0;

    let deleting = false;

    function type() {

        const current = words[wordIndex];

        if (!deleting) {

            element.textContent = current.substring(0, letterIndex++);

            if (letterIndex > current.length) {

                deleting = true;

                setTimeout(type, 1400);

                return;

            }

        } else {

            element.textContent = current.substring(0, letterIndex--);

            if (letterIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        setTimeout(type, deleting ? 40 : 90);

    }

    type();

}

/*==================================================
Hero Mouse Parallax
==================================================*/

function initHeroParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const layers = hero.querySelectorAll(".parallax");

    hero.addEventListener("mousemove", e => {

        const x = (e.clientX / window.innerWidth - .5) * 30;

        const y = (e.clientY / window.innerHeight - .5) * 30;

        layers.forEach((layer, index) => {

            const speed = (index + 1) * 0.25;

            layer.style.transform =

                `translate(${x * speed}px, ${y * speed}px)`;

        });

    });

    hero.addEventListener("mouseleave", () => {

        layers.forEach(layer => {

            layer.style.transform = "translate(0,0)";

        });

    });

}

/*==================================================
Floating Animation
==================================================*/

function initFloatingElements() {

    const elements = document.querySelectorAll(

        ".floating,.hero-shape,.website-floating,.services-shape"

    );

    if (!elements.length) return;

    elements.forEach((element, index) => {

        let angle = index * 45;

        function animate() {

            angle += .02;

            const y = Math.sin(angle) * 8;

            element.style.transform = `translateY(${y}px)`;

            requestAnimationFrame(animate);

        }

        animate();

    });

}

/*==================================================
Hero Scroll Parallax
==================================================*/

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const offset = window.pageYOffset;

    hero.style.backgroundPositionY = `${offset * .4}px`;

});

/*==================================================
Rotate Decorative Elements
==================================================*/

const rotating = document.querySelectorAll(

    ".rotate-slow,.hero-ring,.services-ring,.faq-ring"

);

function rotateElements() {

    const rotation = window.pageYOffset * .05;

    rotating.forEach(element => {

        element.style.transform = `rotate(${rotation}deg)`;

    });

}

window.addEventListener("scroll", rotateElements);

/*==================================================
Floating Cards Hover Effect
==================================================*/

document.querySelectorAll(

    ".pricing-card,.feature-card,.testimonial-card"

).forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - .5) * -8;

        const rotateY = (x / rect.width - .5) * 8;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/*==================================================
Number Count Format
==================================================*/

function formatCounter(number) {

    if (number >= 1000000) {

        return (number / 1000000).toFixed(1) + "M";

    }

    if (number >= 1000) {

        return (number / 1000).toFixed(1) + "K";

    }

    return number;

}

/*==================================================
End of Part 3B.2
==================================================*/
/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3C.1
  Contact Form Validation + Toast Notifications
==================================================*/

/*==================================================
Initialize
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initContactForm();

    initLiveValidation();

});

/*==================================================
Contact Form
==================================================*/

// function initContactForm() {

//     const form = document.querySelector("#contactForm");

//     if (!form) return;

//     form.addEventListener("submit", function (e) {

//         e.preventDefault();

//         if (validateForm(form)) {

//             showToast(
//                 "Thank you! Your consultation request has been received.",
//                 "success"
//             );

//             form.reset();

//             clearValidation(form);

//         } else {

//             showToast(
//                 "Please correct the highlighted fields.",
//                 "error"
//             );

//         }

//     });

// }
const scriptURL =
"https://script.google.com/macros/s/AKfycbyUkNPam12-Pth80-F9Q-mZ-NfXlrdiDkCN1PMpEoqleHzPCJKHCoIyhvWkquG8a2tiqA/exec";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {

        name: form.name.value,

        email: form.email.value,

        phone: form.phone.value,

        business: form.business.value,

        package: form.package.value,

        project: form.project.value

    };

    try{

        const response = await fetch(scriptURL,{

            method:"POST",

            body:JSON.stringify(formData)

        });

        const result = await response.json();

        if(result.result==="success"){

            alert("Thank you! We received your enquiry.");

            form.reset();

        }else{

            alert("Submission failed.");

        }

    }

    catch(error){

        alert("Network Error");

    }

});

/*==================================================
Validate Entire Form
==================================================*/

function validateForm(form) {

    let valid = true;

    const fields = form.querySelectorAll("[required]");

    fields.forEach(field => {

        if (!validateField(field)) {

            valid = false;

        }

    });

    return valid;

}

/*==================================================
Validate Individual Field
==================================================*/

function validateField(field) {

    const value = field.value.trim();

    removeError(field);

    if (value === "") {

        showError(field, "This field is required.");

        return false;

    }

    if (field.type === "email") {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {

            showError(field, "Enter a valid email.");

            return false;

        }

    }

    if (field.name === "phone") {

        const phoneRegex =
            /^[0-9+\-\s()]{8,15}$/;

        if (!phoneRegex.test(value)) {

            showError(field, "Enter a valid phone number.");

            return false;

        }

    }

    if (field.name === "name") {

        if (value.length < 2) {

            showError(field, "Name is too short.");

            return false;

        }

    }

    if (field.tagName === "TEXTAREA") {

        if (value.length < 15) {

            showError(
                field,
                "Please provide more details."
            );

            return false;

        }

    }

    field.classList.add("is-valid");

    return true;

}

/*==================================================
Live Validation
==================================================*/

function initLiveValidation() {

    const fields = document.querySelectorAll(

        "#contactForm input,#contactForm textarea,#contactForm select"

    );

    fields.forEach(field => {

        field.addEventListener("blur", () => {

            validateField(field);

        });

        field.addEventListener("input", () => {

            if (field.classList.contains("is-invalid")) {

                validateField(field);

            }

        });

    });

}

/*==================================================
Show Error
==================================================*/

function showError(field, message) {

    field.classList.remove("is-valid");

    field.classList.add("is-invalid");

    let feedback = field.nextElementSibling;

    if (

        !feedback ||

        !feedback.classList.contains("invalid-feedback")

    ) {

        feedback = document.createElement("div");

        feedback.className = "invalid-feedback";

        field.parentNode.appendChild(feedback);

    }

    feedback.textContent = message;

}

/*==================================================
Remove Error
==================================================*/

function removeError(field) {

    field.classList.remove("is-invalid");

    const feedback = field.parentNode.querySelector(

        ".invalid-feedback"

    );

    if (feedback) {

        feedback.remove();

    }

}

/*==================================================
Clear Validation
==================================================*/

function clearValidation(form) {

    form.querySelectorAll(".is-valid,.is-invalid")

        .forEach(field => {

            field.classList.remove(

                "is-valid",

                "is-invalid"

            );

        });

    form.querySelectorAll(".invalid-feedback")

        .forEach(item => item.remove());

}

/*==================================================
Toast Notification
==================================================*/

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `webapp-toast ${type}`;

    toast.innerHTML = `

        <div class="toast-icon">

            <i class="fas ${
                type === "success"
                ? "fa-circle-check"
                : "fa-circle-xmark"
            }"></i>

        </div>

        <div class="toast-message">

            ${message}

        </div>

    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3500);

}

/*==================================================
End of Part 3C.1
==================================================*/
/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3C.2
  FAQ Enhancements + Ripple Effects
  Magnetic Buttons + Premium UI Interactions
==================================================*/

/*==================================================
Initialize
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initFAQ();

    initRippleButtons();

    initMagneticButtons();

    initTiltCards();

    initHoverIcons();

});

/*==================================================
FAQ Enhancement
==================================================*/

function initFAQ() {

    const items = document.querySelectorAll(".accordion-item");

    if (!items.length) return;

    items.forEach(item => {

        const button = item.querySelector(".accordion-button");

        button.addEventListener("click", () => {

            items.forEach(other => {

                if (other !== item) {

                    other.classList.remove("faq-active");

                }

            });

            item.classList.toggle("faq-active");

        });

    });

}

/*==================================================
Ripple Effect
==================================================*/

function initRippleButtons() {

    const buttons = document.querySelectorAll(

        ".hero-btn,.btn,.btn-primary"

    );

    buttons.forEach(button => {

        button.style.position = "relative";

        button.style.overflow = "hidden";

        button.addEventListener("click", function(e){

            const ripple = document.createElement("span");

            const rect = button.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =

                e.clientX - rect.left - size / 2 + "px";

            ripple.style.top =

                e.clientY - rect.top - size / 2 + "px";

            ripple.className = "btn-ripple";

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 650);

        });

    });

}

/*==================================================
Magnetic Buttons
==================================================*/

function initMagneticButtons() {

    const buttons = document.querySelectorAll(".magnetic");

    buttons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;

            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform =

                `translate(${x * .18}px, ${y * .18}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translate(0,0)";

        });

    });

}

/*==================================================
Premium Tilt Cards
==================================================*/

function initTiltCards() {

    const cards = document.querySelectorAll(

        ".feature-card,.pricing-card,.testimonial-card,.process-card"

    );

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX =

                ((y / rect.height) - .5) * -10;

            const rotateY =

                ((x / rect.width) - .5) * 10;

            card.style.transition = "transform .12s linear";

            card.style.transform =

                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transition =

                "transform .45s ease";

            card.style.transform = "";

        });

    });

}

/*==================================================
Icon Hover Animation
==================================================*/

function initHoverIcons() {

    const icons = document.querySelectorAll(

        ".feature-icon,.process-icon,.contact-icon"

    );

    icons.forEach(icon => {

        icon.addEventListener("mouseenter", () => {

            icon.style.transform =

                "rotate(10deg) scale(1.1)";

        });

        icon.addEventListener("mouseleave", () => {

            icon.style.transform =

                "rotate(0deg) scale(1)";

        });

    });

}

/*==================================================
Image Hover Zoom
==================================================*/

document.querySelectorAll(".image-hover").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.05)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});

/*==================================================
Button Glow
==================================================*/

document.querySelectorAll(".hero-btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.boxShadow =

            "0 15px 35px rgba(66,133,244,.35)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.boxShadow = "";

    });

});

/*==================================================
Input Focus Animation
==================================================*/

document.querySelectorAll(

    ".form-control,.form-select"

).forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("input-focus");

    });

    input.addEventListener("blur", () => {

        input.parentElement.classList.remove("input-focus");

    });

});

/*==================================================
Hover Lift Utility
==================================================*/

document.querySelectorAll(".hover-lift").forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.style.transform =

            "translateY(-8px)";

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform =

            "translateY(0)";

    });

});

/*==================================================
Smooth Number Animation
==================================================*/

document.querySelectorAll("[data-number]").forEach(item => {

    item.style.transition =

        "transform .3s ease";

    item.addEventListener("mouseenter", () => {

        item.style.transform =

            "scale(1.08)";

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform =

            "scale(1)";

    });

});

/*==================================================
End of Part 3C.2
==================================================*/
/*==================================================
  WEBAPP AGENCY WEBSITE
  Part 3D
  Back To Top + Lazy Loading + Performance
  Cursor Effects + Final Utilities
==================================================*/

"use strict";

/*==================================================
Initialize
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initBackToTop();

    initLazyLoading();

    initCursorFollower();

    initPerformance();

    initPageVisibility();

});

/*==================================================
Back To Top Button
==================================================*/

function initBackToTop() {

    const button = document.querySelector(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", throttle(() => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }, 50));

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==================================================
Lazy Loading Images
==================================================*/

function initLazyLoading() {

    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.onload = () => {

                img.classList.add("loaded");

            };

            observer.unobserve(img);

        });

    }, {

        threshold: 0.1

    });

    images.forEach(img => observer.observe(img));

}

/*==================================================
Custom Cursor
==================================================*/

function initCursorFollower() {

    const cursor = document.querySelector(".cursor");

    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    document.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";

        cursor.style.top = e.clientY + "px";

        requestAnimationFrame(() => {

            follower.style.left = e.clientX + "px";

            follower.style.top = e.clientY + "px";

        });

    });

    document.querySelectorAll("a,button,.btn").forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("active");

            follower.classList.add("active");

        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("active");

            follower.classList.remove("active");

        });

    });

}

/*==================================================
Page Visibility API
==================================================*/

function initPageVisibility() {

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.title = "👋 Come Back | WebApp";

        } else {

            document.title = "WebApp | Premium Website Development Agency";

        }

    });

}

/*==================================================
Performance
==================================================*/

function initPerformance() {

    window.addEventListener("resize", debounce(() => {

        console.log("Resize Complete");

    }, 250));

}

/*==================================================
Throttle
==================================================*/

function throttle(callback, delay) {

    let lastCall = 0;

    return function (...args) {

        const now = Date.now();

        if (now - lastCall >= delay) {

            lastCall = now;

            callback.apply(this, args);

        }

    };

}

/*==================================================
Debounce
==================================================*/

function debounce(callback, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback.apply(this, args);

        }, delay);

    };

}

/*==================================================
Scroll Direction
==================================================*/

let lastScroll = 0;

window.addEventListener("scroll", throttle(() => {

    const current = window.pageYOffset;

    document.body.dataset.scroll =

        current > lastScroll ? "down" : "up";

    lastScroll = current;

}, 50));

/*==================================================
Keyboard Accessibility
==================================================*/

document.addEventListener("keyup", e => {

    if (e.key === "Tab") {

        document.body.classList.add("keyboard-user");

    }

});

document.addEventListener("mousedown", () => {

    document.body.classList.remove("keyboard-user");

});

/*==================================================
Network Status
==================================================*/

window.addEventListener("offline", () => {

    console.warn("You are offline.");

});

window.addEventListener("online", () => {

    console.log("Connection restored.");

});

/*==================================================
Disable Right Click (Optional)
Remove this block if you don't want it.
==================================================*/

// document.addEventListener("contextmenu", e => {

//     e.preventDefault();

// });

/*==================================================
Console Welcome Message
==================================================*/

console.log(

`%c
██╗    ██╗███████╗██████╗  █████╗ ██████╗ ██████╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
██║ █╗ ██║█████╗  ██████╔╝███████║██████╔╝██████╔╝
██║███╗██║██╔══╝  ██╔══██╗██╔══██║██╔═══╝ ██╔═══╝
╚███╔███╔╝███████╗██████╔╝██║  ██║██║     ██║
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝

Built with ❤️ by WEBAPP
`,

"color:#4285F4;font-weight:bold;font-size:12px;"

);

/*==================================================
Final Load Animation
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});

/*==================================================
Global Error Handler
==================================================*/

window.addEventListener("error", e => {

    console.error("Application Error:", e.message);

});

/*==================================================
Unhandled Promise Rejection
==================================================*/

window.addEventListener("unhandledrejection", e => {

    console.error("Unhandled Promise:", e.reason);

});

/*==================================================
End of script.js
WEBAPP Agency Website
Version 1.0
==================================================*/