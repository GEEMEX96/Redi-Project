if (window.location.pathname === "/single.html") {
  const id = window.location.search.split("=")[1]
  fetch(`http://localhost:3000/films/${id}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displaySingleFilm(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));
} else {
  fetch('http://localhost:3000/films')
  .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      displayFilms(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}
  
  function displaySingleFilm(film) {
    const filmDiv = document.getElementById("singleData");
    const card = createSingleCard();
    card.children[0].innerText=film.title;
    card.children[1].children[0].src = film.image;
    card.children[1].children[1].innerText="Original Title:\xa0"+film.original_title+
    "\n Original Title Romanised:\xa0 "+film.original_title_romanised+"\n Director:\xa0"
    +film.director+"\n Producer:\xa0"+film.producer+"\n Year:\xa0"+film.release_date
    +"\n length:\xa0"+film.running_time+"\xa0 Minutes\xa0"+"\n Rating:\xa0"+film.rt_score+
    "%\xa0"+"\n Description:\xa0"
    +film.description;
    

    filmDiv.appendChild(card);   
  } 

    function displayFilms(data) {
        data.forEach(film => {
        const filmDiv = document.getElementById("films");
        const card = createAllCards();
        card.children[0].src = film.image;
        card.children[1].children[0].innerText=film.title;
        card.children[1].children[1].innerText= " Year: " +film.release_date+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+"Rate: " +film.rt_score;;
        card.children[1].children[2].innerText="Read More";
        card.children[1].children[2].href=`single.html?id=${film.id}`;
        card.children[1].children[2].id=film.id;
      
        filmDiv.appendChild(card);
       
       });
       
      } 


      const createAllCards = () => {
        var card = document.createElement("div");
      card.className = "card";
      var ReadMore = document.createElement("a");
      ReadMore.className="readmore";
      var img = document.createElement("img");
      img.className = "thumbnail";
      var cardBody = document.createElement("div");
      cardBody.className = "card-body";
      var cardTitle = document.createElement("h3");
      cardTitle.className = "card-title";
      var cardYear = document.createElement("p");
      cardYear.className = "card-text";
      
      card.appendChild(img);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardYear);
      cardBody.appendChild(ReadMore);
      card.appendChild(cardBody);
  
      return card;
  };


    const createSingleCard = () => {
      var card = document.createElement("div");
      card.className = "single-card";
      var cardTitle = document.createElement("h1");
      cardTitle.className = "single-title";
      var img = document.createElement("img");
      img.className = "single-thumbnail";
      var cardBody = document.createElement("div");
      cardBody.className = "film-info";
      var cardInfo = document.createElement("p");
      cardInfo.className = "more-info";
      
      card.appendChild(cardTitle); 
      cardBody.appendChild(img);
      cardBody.appendChild(cardInfo);
      card.appendChild(cardBody);
  
      return card;
  };
      


    

    
  