# Greeting Card App

This is a Vue.js application built with Nuxt.js, dotenv, vuelidate, axios, and tailwind. The application allows users to send greeting cards to their friends and family. 

## Installation


1. Clone the repository:

```sh
git clone https://github.com/yourusername/greeting-card-app.git
```

2. Install dependencies:

```sh
yarn install
```

3. Create a .env file in the root directory with the following variables:
```sh
apiBaseUrl=http://localhost:3000
```
Replace the apiBaseUrl with the base URL of your API endpoint.

4. Start the development server:
```sh
yarn dev
```


## Usage
Open the application in a web browser by navigating to http://localhost:3000. Fill out the greeting card form with your name, email address, recipient's name, recipient's email address, and a message. Click the "Submit" button to send the greeting card.

If there are any errors in the form, error messages will appear under the corresponding fields. If the greeting card is sent successfully, a success message will be displayed.


## Credits
- Nuxt.js - https://nuxtjs.org/
- dotenv - https://www.npmjs.com/package/dotenv
- Vuelidate - https://vuelidate.js.org/
- Axios - https://axios-http.com/
- Tailwind - https://tailwindcss.com/
