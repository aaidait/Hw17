document.addEventListener('DOMContentLoaded', () => {
  const dataTable = document.getElementById('data-table');
  const refetchBtn = document.getElementById('refetch-btn');

  function fetchData() {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Error! Status Code: ' + response.status);
        }
      });
  }

  function renderData(data) {
    dataTable.innerHTML = '';
    const bpi = data.bpi;
    for (const currency in bpi) {
      if (bpi.hasOwnProperty(currency)) {
        const rate = bpi[currency];
        const row = document.createElement('tr');
        row.innerHTML = `<td>${currency}</td><td>${rate.symbol}</td><td>${rate.rate}</td>`;
        dataTable.appendChild(row);
      }
    }
  }

  function showErrorMessage(message) {
    dataTable.innerHTML = `<tr><td colspan="3" class="error-message">${message}</td></tr>`;
  }

  function showLoader() {
    dataTable.innerHTML = '<tr><td colspan="3" class="loading-message">Loading...</td></tr>';
  }

  function hideLoader() {
    refetchBtn.removeAttribute('disabled');
  }

  function fetchAndRenderData() {
    showLoader();
    fetchData()
      .then(data => {
        renderData(data);
        hideLoader();
      })
      .catch(error => {
        showErrorMessage(error.message); 
        hideLoader();
      });
  }

  refetchBtn.addEventListener('click', () => {
    refetchBtn.setAttribute('disabled', 'true');
    fetchAndRenderData();
  });

  fetchAndRenderData();
});
