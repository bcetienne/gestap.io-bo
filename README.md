# Beep
> Gest-ap.io pour les intimes
## Routes list
### Users
* All users : `/users/all`
* One user : `/users/:userId`
* Add one user : `/users/add` (`json` minimum requis `{firstname: String, lastname: String}`)
* Update one user : `/users/update?id=:userId`
* Delete one user : `/users/delete?id=:userId`
### Rooms
* All rooms : `/rooms/all`
* One room : `/rooms/:groupId`
* Add one room : `/rooms/add` (`json` minimum requis `{name: String}`)
* Update one room : `/rooms/update?id=:roomId` 
* Delete one room : `/rooms/delete?id=:roomId`
### Groups
* All groups : `/groups/all`
* One user : `/groups/:groupId`
* Add one user : `/groups/add` (`json` minimum requis `{name: String}`)
* Update one user : `/groups/update?id=:groupId`
* Delete one user : `/groups/delete?id=:groupId`
## To fix
* Bug de fichier/dossiers sur le repo, le dossier `Models` et `Models/Schemas` n'existent plus. Le fichier dans le dernier dossier (le schema des utilisateurs) à été déplacé dans `models/schemas`, mais tout fonctionne sur le site en ligne.