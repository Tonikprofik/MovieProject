const apiUrl = 'https://www.omdbapi.com/?s=Star+Wars&apikey=7d453a07';  // has to be https
const maxMovieCount = 8;    // returns number of films
const htmlMovieTable = document.getElementById('movieTable');   // initial empty movie table

function getMovieData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.Search)
        .then(data => {
          if (data.length > maxMovieCount) {      // if there are more movies
              data.splice(maxMovieCount, data.length);      // splice out the other movies
          }
      
          return data;
        });
}

getMovieData(apiUrl)
    .then(movieData => {
        const currentYear = new Date().getFullYear();   // this year

        movieData.forEach(movie => {  // add key Age and calculate age of each film
          movie.Age = (currentYear - parseInt(movie.Year)).toString();
        })

        // console.log(movieData);  
        // array object where every object is a movie with keys: Age, Title, Poster, Type, Year, imdbID
    

        // create first row of a table with columns Age, Title, Poster, Type, Year, imdbID
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
  
  
  
        // the rest of rows for other movies
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