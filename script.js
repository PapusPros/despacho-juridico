document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('legal-chat');
  const launchButton = document.getElementById('legal-launch');
  const closeButton = document.getElementById('legal-close');
  const form = document.getElementById('legal-form');
  const input = document.getElementById('legal-input');
  const log = document.getElementById('legal-log');
  const contactLink = document.getElementById('legal-contact');
  const footer = document.getElementById('legal-footer');
  const openButtons = document.querySelectorAll('[data-chat-open]');
  const whatsappNumber = '525626177962';

  const showWhatsApp = (messageText) => {
    if (!contactLink) return;
    contactLink.href = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(messageText);
    contactLink.textContent = 'Continuar en WhatsApp';
  };

  const getAnswer = (value) => {
    const question = value.toLowerCase();
    if (question.includes('servicio') || question.includes('áreas') || question.includes('derecho')) {
      return 'Atendemos derecho civil, mercantil y penal, con asesoría preventiva, contenciosa y acompañamiento legal en cada etapa.';
    }
    if (question.includes('horario') || question.includes('atención') || question.includes('hora')) {
      return 'Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00 horas. Puedes solicitar una cita por correo o teléfono.';
    }
    if (question.includes('ubic') || question.includes('direcci') || question.includes('sede')) {
      return 'La ubicación exacta se confirma al momento de programar la cita. Puedes escribirnos para agendar una entrevista inicial.';
    }
    if (question.includes('cita') || question.includes('consult') || question.includes('agendar')) {
      return 'Para solicitar una cita, puedes escribirnos desde este formulario o contactarnos directamente por WhatsApp para confirmar disponibilidad.';
    }
    if (question.includes('honor') || question.includes('precio') || question.includes('costo')) {
      return 'El costo se define según la naturaleza del asunto y la intervención requerida. La primera consulta se orienta para conocer el caso.';
    }
    return 'Puedo orientarte sobre áreas de práctica, horarios, ubicación o cómo pedir una cita. Escribe una palabra clave y te responderé.';
  };

  const addMessage = (sender, text) => {
    const message = document.createElement('div');
    message.className = `legal-message ${sender === 'Tú' ? 'user' : 'bot'}`;
    message.innerHTML = `<strong>${sender}:</strong><p>${text}</p>`;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  };

  const openChat = () => {
    if (!chat) return;
    chat.hidden = false;
    if (launchButton) {
      launchButton.setAttribute('aria-expanded', 'true');
    }
    setTimeout(() => input && input.focus(), 50);
  };

  const closeChat = () => {
    if (!chat) return;
    chat.hidden = true;
    if (launchButton) {
      launchButton.setAttribute('aria-expanded', 'false');
    }
  };

  const handleQuestion = (value) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;

    addMessage('Tú', cleanValue);
    if (input) input.value = '';

    const answer = getAnswer(cleanValue);
    window.setTimeout(() => {
      addMessage('Asistente', answer);
      showWhatsApp('Hola, quiero más información sobre: ' + cleanValue);
      if (footer) {
        footer.textContent = 'Recuerda: esta conversación es informativa y no sustituye asesoría legal personalizada.';
      }
    }, 350);
  };

  if (launchButton) {
    launchButton.addEventListener('click', () => {
      if (chat && chat.hidden) {
        openChat();
      } else {
        closeChat();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeChat);
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', openChat);
  });

  const quickButtons = document.querySelectorAll('[data-question]');
  quickButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const questionText = button.getAttribute('data-question');
      openChat();
      handleQuestion(questionText || 'Quiero información');
    });
  });

  const contactForm = document.getElementById('contact-form');
  const contactSubjectSelect = document.getElementById('contact-subject');
  const hiddenSubject = document.getElementById('contact-subject-hidden');

  if (contactForm && contactSubjectSelect && hiddenSubject) {
    const syncContactSubject = () => {
      const selectedValue = contactSubjectSelect.value.trim();
      hiddenSubject.value = selectedValue
        ? `Nuevo mensaje desde la web - ${selectedValue}`
        : 'Nuevo mensaje desde la web';
    };

    contactSubjectSelect.addEventListener('change', syncContactSubject);
    contactForm.addEventListener('submit', syncContactSubject);
  }

  if (form && input) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleQuestion(input.value);
    });
  }

  if (log) {
    addMessage('Asistente', 'Hola, soy el asistente del despacho. ¿En qué puedo ayudarte hoy?');
  }
});
