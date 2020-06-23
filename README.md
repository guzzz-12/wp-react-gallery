# Frontend del theme Gallery WP Theme
Frontend desarrollado en React que utiliza como backend el tema de Wordpress que se encuentra en el siguiente repositorio:
[Gallery WP Theme](https://github.com/J3duardo/gallery-wp-theme)

## Utilización
1. Clonar el repositorio del theme: ```git clone git@github.com:J3duardo/gallery-wp-theme.git```
2. Cree un sitio de wordpress y copie la carpeta del theme en el directorio de themes de wordpress
3. Ejecutar el servidor de wordpress
4. Clonar el repositorio del frontend: ```git clone git@github.com:J3duardo/wp-react-gallery.git```
5. Instalar las dependencias del frontend: ```npm install```
6. Crear un proxy en el ```package.json``` del frontend para redirigir los requests al servidor de wordpress. Si utiliza XAMMP, el proxy sería ```"proxy": "http://localhost/gallery-theme/wp-json/wp/v2"```
7. Ejecute el frontend ```npm start```

## Capturas de las pantallas principales

### Home
![Home](https://i.imgur.com/qrvEjPs.png)

### Single Post
![SinglePost](https://i.imgur.com/r1ky70R.png)

### Por categoría
![ByCategory](https://i.imgur.com/76n3KTW.png)

### Resultados de la búsqueda
![SearchResults](https://i.imgur.com/MaVyFNB.jpg)