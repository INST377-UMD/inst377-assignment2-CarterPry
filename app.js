window.onload = () => {
  fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    .then(data => {
      const quotes = `${data[0].q} — ${data[0].a}`;
      document.getElementById("quote").textContent = quotes;
    })
    .catch(err => {
      document.getElementById("quote").textContent = "Failed to load quote.";
      console.error("Quote fetch error:", err);
    });


  if (window.annyang){
    const commands = {
      "hello": () => alert("Hello World"),
      "change the color to *color": color => document.body.style.background = color,
      "navigate to *page": page => location.href = page.toLowerCase() + ".html"
    };
    annyang.addCommands(commands);
  }
};
