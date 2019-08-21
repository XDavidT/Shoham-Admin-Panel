// const arr =[
//     ['my id','is time','type','soruce','category','pc-david','1.1.1.1','xdavidt','windows'],

//     ['my id2','is tim2e','typ2e','soruce2','catego2ry','pc-d2avid','21.1.1.1','dsg','linux']
// ]

const request = require('request')

/*This java script page would get json files from MongoDB
User will chose filters, and by those, we can filter specific data to show ! */

const myTable = document.querySelector('tbody')
function fillTable(){

    // Clear the table
    while(myTable.firstChild){
        myTable.removeChild(myTable.firstChild)
    }

    arr.forEach((item) => {
        const tr = document.createElement('tr')

        item.forEach((cell) =>{
            const td = document.createElement('td')
            td.textContent = cell
            tr.appendChild(td)
        })
        myTable.appendChild(tr)
    })
    console.log("OK")
}
fillTable()
