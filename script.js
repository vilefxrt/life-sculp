// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ⚡ Substitua pelo seu link do Web App do Google Apps Script
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbx22ee6DRqU3NNf_TkcL42UARtwLiKhWmk0Yobei3tRP1D8ExfqIm-E-taeHwMU7iGhPw/exec"

  // Define data mínima para o input
  const dateInput = document.getElementById("date")
  const today = new Date().toISOString().split("T")[0]
  dateInput.setAttribute("min", today)

  // Máscara de telefone
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

  // Submissão do formulário
  const form = document.getElementById("bookingForm")
  const formMessage = document.getElementById("formMessage")
  const submitButton = form.querySelector(".btn-submit")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    submitButton.disabled = true
    submitButton.textContent = "Enviando..."
    formMessage.style.display = "none"

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      treatment: "Microagulhamento Facial",
      date: document.getElementById("date").value,
      period: document.getElementById("period").value,
      message: document.getElementById("message").value,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Enviando dados:", formData)

    try {
      const params = new URLSearchParams()
      Object.keys(formData).forEach((key) => {
        params.append(key, formData[key])
      })

      console.log("[v0] Fazendo requisição para:", WEB_APP_URL)

      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Importante para Google Apps Script
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })

      console.log("[v0] Resposta recebida")

      formMessage.className = "form-message success"
      formMessage.style.display = "block"
      formMessage.textContent = "✅ Agendamento enviado com sucesso! Entraremos em contato em breve."
      form.reset()

      formMessage.scrollIntoView({ behavior: "smooth", block: "center" })
    } catch (error) {
      console.error("[v0] Erro ao enviar:", error)
      formMessage.className = "form-message error"
      formMessage.style.display = "block"
      formMessage.textContent =
        "❌ Erro ao enviar o formulário. Por favor, tente novamente ou entre em contato pelo WhatsApp."
    } finally {
      submitButton.disabled = false
      submitButton.textContent = "Garantir Meu Microagulhamento Grátis"
    }

    setTimeout(() => {
      formMessage.style.display = "none"
    }, 8000)
  })

  // Rolagem suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })

  // Efeito de sombra no header
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"
  })
})
