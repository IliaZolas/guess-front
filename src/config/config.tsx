const production = {
    url: 'https://guessing-game-server.azurewebsites.net/'
  };
  
  const development = {
    url: 'http://localhost:4000'
  };
  
  export const config = process.env.NODE_ENV === 'development' ? development : production;