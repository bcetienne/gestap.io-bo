# Beep
> Gest-ap.io pour les intimes

## Routes list

### URL
`http://vps.quentinmodena.fr`

### Users
* All users (type `GET`) : `/users/all`
* One user (type `GET`) : `/users/one?id=:userId`
* User data with RFID (type `GET`) : `/users/rfid?id=:rfidId`
* Login (type `POST`) : `/users/login`
> json requis
```
{
    email: String,
    password: String
}
```
* Add one user (type `POST`) : `/users/add`
> json minimum requis
```
{
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    birthday: String,
    rfid: Array,
    admin: Int-Boolean (0 or 1)
}
```
* Update one user (type `PUT`) : `/users/update?id=:userId`
* Delete one user (type `DELETE`) : `/users/delete?id=:userId`

### Rooms
* All rooms (type `GET`) : `/rooms/all`
* One room (type `GET`) : `/rooms/:groupId`
* Add one room (type `POST`) : `/rooms/add`
> json minimum requis
````
{
    name: String
}
````
* Update one room (type `PUT`) : `/rooms/update?id=:roomId` 
* Delete one room (type `DELETE`) : `/rooms/delete?id=:roomId`

### Groups
* All groups (type `GET`) : `/groups/all`
* One group (type `GET`) : `/groups/:groupId`
* All users of one group (type `GET`) : `/groups/users-of/:groupId`
* Update one group (type `PUT`) : `/groups/update?id=:groupId`
* Delete one group (type `DELETE`) : `/groups/delete?id=:groupId`
---
### Add specific elements to a group
* Add one group (type `POST`) : `/groups/add`
> json minimum requis
````
{
    name: String,
    users: Array,
    courses: Array
}
````
* Add one user to a group (type `PUT`) : `/groups/add-user-to/:groupId`
> données à envoyer (possibilité d'envoyer plusieurs `id` d'utilisateurs à la suite)
````
[
    "XXXXXXXXX"
]
````
* Remove one user to a group (type `PUT`) : `/groups/remove-user-to/:groupId`
> données à envoyer (possibilité d'envoyer plusieurs `id` d'utilisateurs à la suite)
````
[
    "XXXXXXXXX"
]
````
* Add one course to a group (type `PUT`) : `/groups/add-course-to/:groupId` (not finished yet)
> données à envoyer (possibilité d'envoyer plusieurs `id` de cours à la suite)
````
[
    "XXXXXXXXX"
]
````
* Remove one course to a group (type `PUT`) : `/groups/remove-course-to/:groupId` (not finished yet)
> données à envoyer (possibilité d'envoyer plusieurs `id` de cours à la suite)
````
[
    "XXXXXXXXX"
]
````

### Courses
* All courses (type `GET`): `/courses/all`
* One course (type `GET`): `/courses/one/:courseId`
* Add one course (type `POST`): `/courses/add`
> json minimum requis
```
{
    label: String
}
```
* Update one course (type `PUT`): `/courses/update?id=:courseId`
* Delete one course (type `DELETE`): `/courses/delete?id=:courseId`

### Records
* All records (type `GET`) : `/records/all`
* All records for one group (type `GET`) : `/records/all/user?id`
* All records for one group between dates (type `GET`) : `/records/all/user/dates?idUser&date_start&date_end`
* All records between dates (type `GET`) : `/records/all/dates?date_start&date_end`
* Add a record (type `POST`) : `/records/add`
* Update a record (type `PUT`) : `records/update?idRecord`
* Delete a record (type `DELETE`) : `records/delete?idRecord`
* Delete records between dates (type `DELETE`) : `records/delete/dates?date_start&date_end`
* Make an authentication (type `POST`) : `records/authenticate?idCarte`

## To fix
* ~~Bug de fichier/dossiers sur le repo, le dossier `Models` et `Models/Schemas` n'existent plus. Le fichier dans le dernier dossier (le schema des utilisateurs) à été déplacé dans `models/schemas`, mais tout fonctionne sur le site en ligne.~~

## Accès
### mLab
User : `ebcit`

Password : `ebcit-1234`

### alwaysdata
User : `e.blanccoquand@it-akademy.fr`

Password : `admin-1234`
