
(function () {
  const token = localStorage.getItem("authToken");
  
  const form = document.getElementById("petForm");
  const clientSelect = document.getElementById("ClientId");
  const messageDiv = document.getElementById("response");

  const API_URL_PETS = 'http://localhost:3000/api/pets'; 
  const API_URL_CLIENTS = 'http://localhost:3000/api/clients'; 

  function showMessage(text, type = "success") {
    messageDiv.textContent = text;
    messageDiv.style.color = (type === 'error' ? 'red' : 'green');
    messageDiv.style.fontWeight = 'bold'; 
  }

  async function loadClients() {
    showMessage('Carregando clientes...', 'loading');
    
    try {
      const res = await fetch(API_URL_CLIENTS, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });

      let data = {};
      try { data = await res.json(); } catch (_) {} // Tenta ler JSON

      if (!res.ok) {
        const msg = data?.message || `Erro ${res.status} ao buscar clientes.`;
        throw new Error(msg);
      }

      clientSelect.innerHTML = '<option value="">Selecione um cliente...</option>';
      
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.id; 
          opt.textContent = `${c.name} (Doc: ${c.document})`; 
          clientSelect.appendChild(opt);
        });
        showMessage(''); // Limpa a mensagem de carregamento
      } else {
        clientSelect.innerHTML = '<option value="">Nenhum cliente cadastrado.</option>';
        showMessage('Nenhum cliente encontrado. Cadastre um cliente primeiro.', 'error');
      }

    } catch (err) {
      showMessage(`Erro ao carregar clientes: ${err.message}`, 'error');
      clientSelect.innerHTML = '<option value="">Erro ao carregar clientes</option>';
    }
  }
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage('Enviando Pet...', 'loading');

    if (!clientSelect.value) {
      showMessage("Selecione o dono (Cliente) para o Pet.", "error");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(API_URL_PETS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` 
        },
        body: formData
      });

      let result = {};
      try { result = await response.json(); } catch (_) {}

      if (!response.ok) {
        const msg = result?.message || result?.errorDetails || `Erro ${response.status}`;
        throw new Error(msg);
      }

      showMessage(`✅ Pet salvo com sucesso! ID: ${result.id}`, "success");
      form.reset();

    } catch (err) {
      showMessage(`Erro ao salvar Pet: ${err.message}`, "error");
      console.error(err);
    }
  });

  loadClients();
})();