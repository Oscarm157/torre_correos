/**
 * Torre Correos - Form Module
 * Handles contact form validation, submission, and user feedback
 */

import { isValidEmail, shakeElement, showMessage } from './utils.js';

/**
 * Initialize contact form functionality
 * Sets up form validation, submission handling, and user interactions
 */
export function initForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Add focus animations to inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje')
        };

        if (!data.nombre || !data.email || !data.telefono) {
            showMessage('Por favor completa todos los campos requeridos.', 'error', form);
            shakeElement(form);
            return;
        }

        if (!isValidEmail(data.email)) {
            showMessage('Por favor ingresa un email válido.', 'error', form);
            shakeElement(form);
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="btn-loading"></span> Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', 'success', form);
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Success animation
            submitBtn.classList.add('success');
            setTimeout(() => submitBtn.classList.remove('success'), 1000);
        }, 1500);
    });
}
