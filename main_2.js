// async/await

document.addEventListener('DOMContentLoaded', () => {
    const dataTable = document.getElementById('data-table');
    const refetchBtn = document.getElementById('refetch-btn');
  
    async function fetchData() {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        if (!response.ok) {
          throw new Error('Error!');
        }
        return await response.json();
      } catch (error) {
        throw new Error('Error fetching data');
      }
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
  
    async function fetchAndRenderData() {
      showLoader();
      try {
        const data = await fetchData();
        renderData(data);
      } catch (error) {
        showErrorMessage('Oops! Something went wrong.');
      } finally {
        hideLoader();
      }
    }
  
    refetchBtn.addEventListener('click', async () => {
      refetchBtn.setAttribute('disabled', 'true');
      await fetchAndRenderData();
    });
  
    fetchAndRenderData();
  });