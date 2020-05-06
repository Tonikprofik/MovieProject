const apiUrl = 'https://www.omdbapi.com/?s=Star+Wars&apikey=7d453a07';  // bacha, musi tady byt https!!!
const maxMovieCount = 5;    // vracenych pocet filmu
const htmlMovieTable = document.getElementById('movieTable');   // nase zatim prazdna tabulka

function getMovieData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.Search)
        .then(data => {
          if (data.length > maxMovieCount) {      // pokud se tam najde vice filmu
              data.splice(maxMovieCount, data.length);      // smazat prebyvajici filmy
          }
      
          return data;
        });
}

getMovieData(apiUrl)
    .then(movieData => {
        const currentYear = new Date().getFullYear();   // tento rok

        movieData.forEach(movie => {  // pridani klice Age a vypocet prislusne hodnoty stari filmu ke kazdemu filmu
          movie.Age = (currentYear - parseInt(movie.Year)).toString();
        })

        // console.log(movieData);  // Vysledek je pole objektu, kde kazdy objekt je jeden film s klicema: Age, Title, Poster, Type, Year, imdbID
    

        // Vytvorime prvni radek tabulky se sloupcema Age, Title, Poster, Type, Year, imdbID
        let firstRow = document.createElement('div');
        firstRow.classList.add('movieTable__row');
        firstRow.classList.add('movieTable__row--first');
  
        Object.keys(movieData[1]).forEach(key => {
            let column = document.createElement('div');
            let columnText = document.createTextNode(key);
            column.classList.add('movieTable__' + key);
            column.appendChild(columnText);
            firstRow.appendChild(column);
        })
  
        htmlMovieTable.appendChild(firstRow);
  
  
  
        // Vytvorime zbytek radku pro vsechny filmy
        for (var i = 0; i < movieData.length; i++) {
            let movieCellData = movieData[i];
            let movieRow = document.createElement('div');
            movieRow.classList.add('movieTable__row');
            movieRow.classList.add('movieTable__row--movie');

            Object.keys(movieCellData).forEach(key => {
                let movieCell = document.createElement('div');
                movieCell.classList.add('movieTable__' + key);
              
                if (key !== 'Poster') {                
                    let movieCellValue = document.createTextNode(movieCellData[key]);
                    movieCell.appendChild(movieCellValue);
                } else {
                    let movieCellImg = document.createElement('img');
                    movieCellImg.setAttribute('src', movieCellData[key]);
                    movieCell.appendChild(movieCellImg);
                }
                movieRow.appendChild(movieCell);
            })
          
            htmlMovieTable.appendChild(movieRow);
        }
    });