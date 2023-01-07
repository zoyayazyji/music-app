## Описание ресурса

#### REST API - LastFM позволяет добавлять 

- Исполнителей (Artists)
- Альбомы (Albums) со ссылкой на Исполнителя (Artist_id)
- Музыкальные Треки (Tracks) со ссылкой на Альбом (Album_id) 
- позволяет зарегистрировать нового пользователя (User) 
-  фиксировать историю прослушивания музыкальных треков конкретным пользователем (TracksHistory)

#### REST API - LastFM также позволяет просматривать 

- Список Исполнителей (Artists)
- Список Альбомов (Albums)
- Конкретный Альбом (Albums) в котором будет видна вся информация о Исполнителе (Artists)
- Список треков (Tracks)
- Конкретный трек (Tracks)в котором будет видна вся информация о Альбоме  (Albums)

### Схемы запроса

- Исполнители (Artists) - http://localhost:8000/artist

- Альбомы (Albums) - http://localhost:8000/albums

- Музыкальные треки (Tracks) - http://localhost:8000/tracks

- Пользователи (Users) - http://localhost:8000/users

- История (TracksHistory) - http://localhost:8000/tracks_history


### Конечные точки и методы

- ***Исполнители (Artists)***

> ***POST /*** - создается новый исполнитель c обязательными полями name, image где image  это файл (можно добавить только один файл)и необязательным information
Параметры тела запроса - form-data
 
> ***GET /***  - получаем список всех исполнителей

###### схема ответа 

```
[
  {
    "_id": "62fd0d6a535bac7960d2bf25",
    "name": "Sting",
    "information": "Rock",
    "image": "oRe3bjZbOGxKWdCXYtqtl.jpg",
    "__v": 0
  },
  {
    "_id": "62fd0d95535bac7960d2bf27",
    "name": "Madonna",
    "information": "Rock",
    "image": "jb1HKGCwmaW-O4bPgHyW3.jpg",
    "__v": 0
  }
]
  ```
- ***Альбомы (Albums)***

> ***POST /*** - создается новый альбом c обязательными полями title, artist где artist это artist_id (ссылка) и необязательными relise, image где image  это файл (можно добавить только один файл, название файла заменяется на рандомную строку)
Параметры тела запроса - form-data

> ***GET /*** -  получаем список всех  альбомов,
Также можно передать ID "artist" как query-параметр и получить список альбомов конкретного исполнителя. (/albums?artist=....)


###### схема ответа 

```
[
  {
    "_id": "62fd10b44ef6eca2b46da682",
    "title": "Like a virgin",
    "relise": "1985",
    "artist": "62fd0d95535bac7960d2bf27",
    "image": "BZu-huMjSdvq45sAscule.png",
    "__v": 0
  },
  {
    "_id": "62fd122f4ef6eca2b46da68b",
    "title": "Like a Prayer",
    "relise": "1989",
    "artist": "62fd0d95535bac7960d2bf27",
    "image": "fvJiFl0EyeFZk1X4PDxei.jpg",
    "__v": 0
  }
]

```


> ***GET /:id*** -  получаем информацию о конкретном альбоме, включая информацию о его исполнителе

###### схема ответа 

```
{
  "_id": "62fd10b44ef6eca2b46da682",
  "title": "Like a virgin",
  "relise": "1985",
  "artist": {
    "_id": "62fd0d95535bac7960d2bf27",
    "name": "Madonna",
    "information": "Rock",
    "image": "jb1HKGCwmaW-O4bPgHyW3.jpg",
    "__v": 0
  },
  "image": "BZu-huMjSdvq45sAscule.png",
  "__v": 0
}
```

- ***Треки (Tracks)***

> ***POST /*** - создается новый трек c обязательными полями title, album где album это album_id  (ссылка) и необязательным duration
Параметры тела запроса - JSON

> ***GET /*** -  получаем список всех треков,
Также можно передать ID "album" как query-параметр и получить список треков в конкретном альбоме. (/tracks?album=....)

###### схема ответа 

```
[
  {
    "_id": "62fdbaafa32236e832dbfa3f",
    "title": "Angel",
    "album": "62fd10b44ef6eca2b46da682",
    "duration": "3:50",
    "__v": 0
  },
  {
    "_id": "62fdbb12a32236e832dbfa46",
    "title": "Over and Over",
    "album": "62fd10b44ef6eca2b46da682",
    "duration": "4:12",
    "__v": 0
  }
]

```

###### query-params

```

{
    "_id": "62fdbc97a32236e832dbfa58",
    "title": "Island of Souls",
    "album": {
      "_id": "62fd13044ef6eca2b46da693",
      "title": "he Soul Cages",
      "relise": "1991",
      "artist": "62fd0d6a535bac7960d2bf25",
      "image": "e4fKYDhpPqe--YkW0Eodd.jpg",
      "__v": 0
    },
    "duration": "5:02",
    "__v": 0
}

```
- ***Midleware Auth***

> Содержит информацию о аутентификации, token пользователя в виде строки, отправляется в заголовок ***Authorization***, middleware может быть подключен к необходимым роутам

- ***Fixtures***

>  fixtures.js файл с подключением к базе данных, при запуске которого текущая база данных удаляется и в нее записывается набор определенных тестовых данных.
Модели User, Artist, Album, TrackHistory, Track были заполнены фиктурными данными.

- ***Пользователи (Users)***

> ***POST /*** - регистрация (создание) нового пользователя
Параметры тела запроса - JSON

> ***POST /sessions*** - логин пользователя,  создается token и записывает его в сущность Пользователи (с использованием middleware Auth)

- ***История (Track_History)***

> ***POST /*** - создается новая запись c обязательным полем  track где track это track_id (ссылка) прослушанной композиции, также принимает токен аутентификации через заголовки
запроса (с использованием middleware Auth), используя этот параметр начинается проверка пользователя с таким token. Если пользователь не найден, token считается неверным и приходит ошибка 401 Unauthorized



