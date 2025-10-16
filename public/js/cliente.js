
(function () {
  const form = document.getElementById("clientForm");
  const messageDiv = document.getElementById("response");
  const API_URL = 'http://localhost:3000/api/clients';
  const token = localStorage.getItem("authToken"); 

  function showMessage(text, type = "success") {
    messageDiv.textContent = text;
    messageDiv.style.color = (type === 'error' ? 'red' : 'green');
    messageDiv.style.fontWeight = 'bold'; 
  }
  

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage('Enviando...', 'loading');

    const fullName = (form.fullName.value || "").trim();
    const cpfRaw = (form.cpf.value || "").trim();

    if (!fullName || !cpfRaw) {
      showMessage("Preencha Nome e Documento.", "error");
      return;
    }

    const documentNumbers = cpfRaw.replace(/\D/g, ""); 
    
    const clientData = { 
        name: fullName, 
        document: documentNumbers 
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(clientData) 
      });

      const clone = response.clone(); 
      let result = {};
      let msg = '';
      
      try { 
          result = await clone.json(); 
          msg = result.message || result.errorDetails || `Erro ${response.status} (JSON).`;
      } catch (e) {
          const textError = await response.text();
          msg = textError || `Erro ${response.status} (Texto vazio).`;
      }

      if (!response.ok) {
        throw new Error(msg);
      }


      showMessage(`Cliente salvo com sucesso! ID: ${result.id}`, "success");
      form.reset();

    } catch (err) {
      showMessage(`Erro: ${err.message}`, "error");
      console.error(err);
    }
  });
})();