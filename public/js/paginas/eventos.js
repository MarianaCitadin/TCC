document.addEventListener('DOMContentLoaded', function() {
    // Obtém o formulário de filtro e a lista de eventos
    const filterForm = document.getElementById('filterForm');
    const eventList = document.querySelectorAll('.event');
    
    // Filtra eventos ao preencher o formulário
    filterForm.addEventListener('input', function() {
        const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
        const searchDate = document.getElementById('searchDate').value;

        eventList.forEach(event => {
            const title = event.querySelector('.event-title').textContent.toLowerCase();
            const date = event.querySelector('.event-date').textContent;
            
            // Verifica se o evento corresponde ao filtro
            const matchesTitle = title.includes(searchTerm);
            const matchesDate = searchDate ? date.includes(searchDate) : true;
            
            if (matchesTitle && matchesDate) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    });
});
