let stockChart = null;

function loadStock(){
  
  const ticker = document.getElementById("ticker").value.toUpperCase();
  const days = parseInt(document.getElementById("days").value);
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const s = start.toISOString().split("T")[0];
  const e = end.toISOString().split("T")[0];

  fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${s}/${e}?adjusted=true&sort=asc&limit=120&apiKey=cntn72WC9Bj6cvX7Tq1GDZW0CAk5UJf8`)
    .then(res => res.json())
    .then(data => {

      const results = data.results || [];
      const labels = results.map(r => new Date(r.t).toLocaleDateString());
      const values = results.map(r => r.c);

      if (stockChart){
        stockChart.destroy();
      }

      stockChart = new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: ticker,
            data: values,
            borderColor: 'blue',
            fill: false
          }]
        }
      });
    });
}




fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
  .then(res => res.json())
  .then(data => {

    const top = data.slice(0, 5);
    const tbody = document.querySelector("#reddit tbody");

    tbody.innerHTML = "";

    top.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><a href="https://finance.yahoo.com/quote/${item.ticker}" target="_blank">${item.ticker}</a></td>
        <td>${item.no_of_comments}</td>
        <td>${item.sentiment} ${item.sentiment === "Bullish" ? "📈" : "📉"}</td>
      `;
      row.style.backgroundColor = item.sentiment === "Bullish" ? "#d4fcdc" : "#fcdada";
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error fetching Reddit stock data", err);
  });




if (annyang){
  annyang.addCommands({
    "lookup *ticker": t => {
      document.getElementById("ticker").value = t.toUpperCase();
      document.getElementById("days").value = "30";
      loadStock();
    }
  });
  annyang.start();
}
