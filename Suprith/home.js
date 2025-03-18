 // Charts & Graphs
 const ctxBar = document.getElementById("chart-bar").getContext("2d");
 new Chart(ctxBar, {
     type: "bar",
     data: {
         labels: ["Q1", "Q2", "Q3", "Q4"],
         datasets: [{
             label: "Production Output",
             data: [120, 180, 150, 200,100],
             backgroundColor: ["red", "blue", "green", "orange"]
         }]
     },
     options: {
         responsive: true,
         plugins: {
             legend: { position: 'top' },
             title: { display: true, text: 'Quarterly Production Output' }
         }
     }
 });

 const ctxPie = document.getElementById("chart-pie").getContext("2d");
 new Chart(ctxPie, {
     type: "pie",
     data: {
         labels: ["Completed", "In Progress", "Pending"],
         datasets: [{
             label: "Project Status Distribution",
             data: [5, 3, 2],
             backgroundColor: ["green", "blue", "red"]
         }]
     },
     options: {
         responsive: true,
         plugins: {
             legend: { position: 'top' },
             title: { display: true, text: 'Project Status Distribution' }
         }
     }
 });