# Beep
> Gest-ap.io pour les intimes

## Routes list

### URL
`http://ebcitakademy.alwaysdata.net`

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
    rfid: String,
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
* One user (type `GET`) : `/groups/:groupId`
* Add one user (type `POST`) : `/groups/add`
> json minimum requis
````
{
    name: String
}
````
* Update one user (type `PUT`) : `/groups/update?id=:groupId`
* Delete one user (type `DELETE`) : `/groups/delete?id=:groupId`

### Records
* All records (type `GET`) : `/records/all`
* One record (type `GET`) : `/records/one`
* Add a record (type `POST`) : `/records/add`
* Update a record (type `PUT`) : `records/update`
* Delete a record (type `DELETE`) : `records/delete`

## To fix
* Bug de fichier/dossiers sur le repo, le dossier `Models` et `Models/Schemas` n'existent plus. Le fichier dans le dernier dossier (le schema des utilisateurs) à été déplacé dans `models/schemas`, mais tout fonctionne sur le site en ligne.