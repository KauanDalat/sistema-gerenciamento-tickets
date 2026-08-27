

const form = document.getElementById('ticketForm');
const tbody = document.getElementById('ticketTableBody');

function renderTable() {
    tbody.innerHTML = '';
    
    tickets.forEach((ticket, index) => {
        let situacaoClass = ticket.situacao === 'Em desenvolvimento' ? 'badge-desenvolvimento' : 'badge-resposta';
        let categoriaClass = ticket.categoria === 'Inconsistencia' ? 'text-inconsistencia' : 'text-sugestao';
        
        let dataFormatada = ticket.data ? ticket.data.split('-').reverse().join('/') : '';

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><b>${ticket.num}</b></td>
            <td>${ticket.status}</td>
            <td>${dataFormatada}</td>
            <td><span class="${situacaoClass}">${ticket.situacao}</span></td>
            <td><span class="${categoriaClass}">${ticket.categoria}</span></td>
            <td>${ticket.conclusao}</td>
            <td>
                ${ticket.obs ? ticket.obs + '<br>' : ''}
                <div style="margin-top: 5px; display: flex; gap: 5px; justify-content: center;">
                    <button class="btn-acao btn-editar" onclick="editarTicket(${index})">Editar</button>
                    <button class="btn-acao btn-excluir" onclick="excluirTicket(${index})">Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    localStorage.setItem('tickets', JSON.stringify(tickets));
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const editIndex = document.getElementById('editIndex').value;
    const novoTicket = {
        num: document.getElementById('numTicket').value,
        status: document.getElementById('status').value,
        data: document.getElementById('dataCriacao').value,
        situacao: document.getElementById('situacao').value,
        categoria: document.getElementById('categoria').value,
        conclusao: document.getElementById('conclusao').value,
        obs: document.getElementById('obs').value
    };

    if (editIndex === "") {
        tickets.push(novoTicket);
    } else {
        tickets[editIndex] = novoTicket;
        cancelarEdicao();
    }

    form.reset();
    renderTable();
});

function editarTicket(index) {
    let t = tickets[index];
    document.getElementById('numTicket').value = t.num;
    document.getElementById('status').value = t.status;
    document.getElementById('dataCriacao').value = t.data;
    document.getElementById('situacao').value = t.situacao;
    document.getElementById('categoria').value = t.categoria;
    document.getElementById('conclusao').value = t.conclusao;
    document.getElementById('obs').value = t.obs;
    
    document.getElementById('editIndex').value = index;
    document.getElementById('btnSalvar').innerText = "Atualizar Ticket";
    document.getElementById('formTitle').innerText = "EDITAR TICKET #" + t.num;
    document.getElementById('btnCancelar').style.display = "inline-block";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filtrarTickets() {
    const termoBusca = document.getElementById('inputBusca').value.trim();
    const linhas = tbody.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        let celulaNum = linhas[i].getElementsByTagName('td')[0];
        if (celulaNum) {
            let numeroTicket = celulaNum.textContent || celulaNum.innerText;
            
            // Se o campo de busca estiver vazio ou corresponder ao ticket, exibe a linha
            if (termoBusca === "" || numeroTicket.includes(termoBusca)) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none"; // Oculta os que não batem com a busca
            }
        }
    }
}

function ordenarTickets() {
    const criterio = document.getElementById('selectOrdenacao').value;

    if (criterio === 'recente') {
        tickets.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else if (criterio === 'antigo') {
        tickets.sort((a, b) => new Date(a.data) - new Date(b.data));
    }
    
    renderTable();
    filtrarTickets(); // Mantém o filtro ativo caso haja uma busca digitada
}

function cancelarEdicao() {
    form.reset();
    document.getElementById('editIndex').value = "";
    document.getElementById('btnSalvar').innerText = "Salvar Ticket";
    document.getElementById('formTitle').innerText = "REGISTRAR NOVO TICKET";
    document.getElementById('btnCancelar').style.display = "none";
}

function excluirTicket(index) {
    if (confirm("Tem certeza que deseja excluir este ticket?")) {
        tickets.splice(index, 1);
        renderTable();
        // Se estava editando exatamente o item que foi excluído, reseta o formulário
        if (document.getElementById('editIndex').value == index) {
            cancelarEdicao();
        }
    }
}

renderTable();