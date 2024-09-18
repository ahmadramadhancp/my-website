document.getElementById('fetchBtn').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;

    // Validasi apakah URL kosong
    if (!url) {
        alert("Please enter a valid URL.");
        return;
    }

    // Menggunakan Axios untuk mengambil data dari URL
    axios.get(url)
        .then(function(response) {
            const data = response.data;

            // Mengosongkan table container jika sebelumnya ada tabel
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = '';

            // Cek apakah data adalah array
            if (Array.isArray(data)) {
                createTableFromArray(data);
            } else if (typeof data === 'object') {
                createTableFromObject(data);
            } else {
                tableContainer.innerHTML = '<p>Data is not in a valid format for table display.</p>';
            }
        })
        .catch(function(error) {
            alert('Error fetching data: ' + error);
        });
});

// Fungsi untuk membuat tabel dari array
function createTableFromArray(dataArray) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Membuat header dari objek pertama
    const headers = Object.keys(dataArray[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Membuat baris data
    dataArray.forEach(item => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('tableContainer').appendChild(table);
}

// Fungsi untuk membuat tabel dari objek
function createTableFromObject(dataObject) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Membuat baris data dari key-value
    for (const [key, value] of Object.entries(dataObject)) {
        const row = document.createElement('tr');
        const tdKey = document.createElement('td');
        const tdValue = document.createElement('td');

        tdKey.textContent = key;
        tdValue.textContent = value;

        row.appendChild(tdKey);
        row.appendChild(tdValue);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    document.getElementById('tableContainer').appendChild(table);
}
