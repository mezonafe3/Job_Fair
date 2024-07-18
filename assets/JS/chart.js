let chart = $("#myChart")
let doughnut = $("#myChartDounut")
let line = $("#myChartLine")
let deafultData=[
    {
    "date": "2022-01-01",
    "amount": 1000
    },
    {
    "date": "2022-01-02",
    "amount": 1000
    }]

let x;
let y;
let c;
function disaplayCharts(data){
    
    if(x){
        x.destroy()
    }
    if(y){
        y.destroy()
    }
    if(c){
        c.destroy()
    }
    x=new Chart(chart, {
        type: 'bar',
        data: {
            labels: data.map(X=>X.date),
            datasets: [{
                label: 'Amount',
                data:data.map(X=>X.amount),
                borderWidth: 1,
                backgroundColor: ['#9290C3','#535C91']
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    bottom:0

                },
                margin:{
                    bottom:0
                }
            },
    
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false 
                    }
                }
                
            },
            maintainAspectRatio: false
        }
    });
    
    y=new Chart(doughnut, {
        type: 'doughnut',
        data: {
            labels:data.map(X=>X.date),
            datasets: [{
                label: 'Amount',
                data: data.map(X=>X.amount),
                borderWidth: 1,
                backgroundColor: ['#9BD0F5','#070F2B']
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    bottom:0

                },
                margin:{
                    bottom:0
                }
            },
            scales: {
                y: {
                    display: false, 
                    grid: {
                        display: false 
                    }
                },
                x: {
                    display: false,
                    grid: {
                        display: false 
                    }
                }
            },
            maintainAspectRatio: false
        }
    });
    
    
    c=new Chart(line, {
        type: 'line',
        data: {
            labels: data.map(X=>X.date),
            datasets: [{
                label: 'Amount',
                data: data.map(X=>X.amount),
                borderWidth: 1
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    bottom:0,
                    top:0,
                    right:0

                },
                margin:{
                    left: 0,
                    bottom:0,
                    top:0,
                    right:0
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false 
                    }
                }
            },
            maintainAspectRatio: false
        }
    });
   
}


function z(x,y,c){
    x.destroy()
    y.destroy()
    c.destroy()

}


async function getData(){
    let customerData = await fetch("http://localhost:3000/customers")
    let finalCustData= await customerData.json()
    let customersName=finalCustData.map(elemnt=>elemnt.name);

    let transactionData = await fetch("http://localhost:3000/transactions")
    let finalTransData= await  transactionData.json()
    finalTransData.forEach(elemnt=>{
        elemnt["name"]=customersName[elemnt.customer_id-1]
    })
    console.log(finalTransData.filter(namee=>namee.name=="Ahmed Ali")[1].date);

    
    displayData(finalTransData)
    getAmountByName(finalTransData)
    
}

function displayData(data){
    data.forEach(elemnt=>{
        $("tbody").append(`<tr class="tr-${elemnt.id} text-center pointer py-2 b-top"></tr>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.id}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="name py-2">${elemnt.name}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.date}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.amount}</td>`)
    })
    
}


function getAmountByName(data){
    $("tr").click(function(){
        $("tbody").empty()
        let selectedName=$(this).find(".name").html();
        let filterdData=data.filter(item=>item.name==selectedName);
        displayData(filterdData)
        disaplayCharts(filterdData)
    
    })
}
getData()

$(".fa-refresh").click(function(){
    $("tbody").empty()
    getData()
})


disaplayCharts(deafultData)