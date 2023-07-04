# car-catalog instructions

After clone the repositori on your pc:

## Positioned at Server folder you need:

npm init

npm i express

npm i nodemon

npm i cors

npm i mongoose

npm dotenv

npm i bcryptjs

npm install jsonwebtoken

## Positioned at Client folder you need: 

npm create vite@latest

cd vite-project

npm install

npm i axios

npm i react-bootstrap

npm install google-maps-react

npm i react-router-dom

# To run the project: 

## to run the backend 

On command line enter to server folder an then run the backend with this command: 

`npm start`

## to run the frontend 

On command line enter to client folder then to vite-project an then run the frontend with this command: 

`npm run dev`

# How to use it
- To car catalog: When you run de frontend from the command line, just copy the url at `catalog` info and then add /catalog to the end of the url on your borwser. 
- To login: When you run de frontend from the command line, just copy the url at `local` info and then add /login to the end of the url on your borwser. 
- To sign up: When you run de frontend from the command line, just copy the url at `local` info and then add /sign-up to the end of the url on your borwser. 

# IMPORTANT NOTES:
If the sign-up doesn't work try to register a user with a json format using Postman as in the next example: 
![image](https://github.com/nora-programadora/car-catalog/assets/43866226/89ef433a-4fb2-4661-baa8-002dd3bc325b)

Then to show login works go to the login form and enter the email and password you entered at sing-up form C: 

## also: 

Problems with the map loading, I really tried different ways but most of times the map didn't load or if it is, then the car markers don't so, you could try first commenting the line of getData fuction at useEffect function on catalog.jsx
![image](https://github.com/nora-programadora/car-catalog/assets/43866226/9f077cdc-ea39-45d6-930b-b489f866b31e)

then uncomment the line and after you register some cars you gona see the markers as the next img: 
![image](https://github.com/nora-programadora/car-catalog/assets/43866226/49449586-885b-4312-8c2a-cca5a0ba0da5)


