const production = {
    url: 'https://server-guessing-game.azurewebsites.net/'
  };
  
  const development = {
    url: 'http://localhost:4000'
  };
  
  export const config = process.env.NODE_ENV === 'development' ? development : production;