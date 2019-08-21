$.getJSON('/logs/data2table',function(data){
    fillTable(data)
})

function fillTable(logsData){
    const myTable = document.querySelector('tbody')
    // Clear the table
    while(myTable.firstChild){
        myTable.removeChild(myTable.firstChild)
    }
    logsData.forEach(function (_log) {
        const tr = document.createElement('tr')


        const td1 = document.createElement('td')
        td1.textContent = _log.logid
        tr.appendChild(td1)
        const td2 = document.createElement('td')
        td2.textContent = _log.time
        tr.appendChild(td2)
        const td3 = document.createElement('td')
        td3.textContent = _log.type
        tr.appendChild(td3)
        const td4 = document.createElement('td')
        td4.textContent = _log.src
        tr.appendChild(td4)
        const td5 = document.createElement('td')
        td5.textContent = _log.cat
        tr.appendChild(td5)
        const td6 = document.createElement('td')
        td6.textContent = _log.hostname
        tr.appendChild(td6)
        const td7 = document.createElement('td')
        td7.textContent = _log.ip_add
        tr.appendChild(td7)
        const td8 = document.createElement('td')
        td8.textContent = _log.username
        tr.appendChild(td8)
        const td9 = document.createElement('td')
        td9.textContent = _log.os
        tr.appendChild(td9)

        myTable.appendChild(tr)
    })
}


//TODO: Understand how datatable is generate (select entries etc..)