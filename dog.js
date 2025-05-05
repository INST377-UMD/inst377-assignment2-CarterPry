window.onload = () => {


  
  fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
      const carousel = document.getElementById("carousel");
      data.message.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.width = 200;
        carousel.appendChild(img);
      });
    });





  fetch("https://api.thedogapi.com/v1/breeds")
    .then(res => res.json())
    .then(data => {

      const breeds = document.getElementById("breeds");
      const breedInfo = document.getElementById("breed-info");

      data.forEach(breed => {
        const btn = document.createElement("button");
        btn.textContent = breed.name;
        btn.onclick = () => {
          breedInfo.innerHTML = `
            <h3>${breed.name}</h3>
            <p><strong>Temperament:</strong> ${breed.temperament || "Unknown"}</p>
            <p><strong>Life Span:</strong> ${breed.life_span || "N/A"}</p>
          `;
        };
        breeds.appendChild(btn);
      });





      if (window.annyang){
        const commands = {};
        data.forEach(breed => {
          commands[`load dog breed ${breed.name.toLowerCase()}`] = () => {
            const match = Array.from(document.querySelectorAll("#breeds button"))
              .find(btn => btn.textContent.toLowerCase() === breed.name.toLowerCase());
            if (match) match.click();
          };
        });
        annyang.addCommands(commands);
        annyang.start();
      }
    });
};
