// Set minimum date to today
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date")
  const today = new Date().toISOString().split("T")[0]
  dateInput.setAttribute("min", today)

  // Phone mask
  const phoneInput = document.getElementById("phone")
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      value = `(${value}`
    }

    e.target.value = value
  })

  // Form submission
  const form = document.getElementById("bookingForm")
  const formMessage = document.getElementById("formMessage")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      treatment: "Limpeza de Pele Grátis", // Fixed treatment
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      message: document.getElementById("message").value,
    }

    // Simulate form submission
    console.log("Form submitted:", formData)

    // Show success message
    formMessage.className = "form-message success"
    formMessage.textContent =
      "Agendamento confirmado! Entraremos em contato em breve para confirmar sua limpeza de pele grátis."

    // Reset form
    form.reset()

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)

    // In a real application, you would send this data to a server
    // Example:
    // fetch('/api/booking', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     formMessage.className = 'form-message success';
    //     formMessage.textContent = 'Agendamento enviado com sucesso!';
    // })
    // .catch(error => {
    //     formMessage.className = 'form-message error';
    //     formMessage.textContent = 'Erro ao enviar agendamento. Tente novamente.';
    // });
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })
})
