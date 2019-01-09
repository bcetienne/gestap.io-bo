# Beep
> Gest-ap.io pour les intimes
## Routes list
### Users
* All users : `/users/all`
* One user : `/users/:userId`
* Add one user : `/users/add` (au moins dans le `json` les éléments `firstname` et `lastname`)
* Update one user : `/users/update?id=:userId` (pas mis à jour vers la dernière version)
* Delete one user : `/users/delete?id=:userId`
### Rooms
* All rooms : `/rooms/all`
* One room : `/rooms/:groupId`
* Add one room : `/rooms/add` (au moins dans le `json` l'élément `name`)
* Update one room : `/rooms/update?id=:roomId` 
* Delete one room : `/rooms/delete?id=:roomId`
### Groups
* All groups : `/groups/all`
* One user : `/groups/:groupId`
* Add one user : `/groups/add` (au moins dans le `json` les éléments `name`)
* Update one user : `/groups/update?id=:groupId`
* Delete one user : `/groups/delete?id=:groupId`