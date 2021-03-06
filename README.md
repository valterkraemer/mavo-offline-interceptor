# Mavo-offline

A [Mavo](https://mavo.io) plugin that caches data in localStorage.

Mavo-offline stores Mavo's fetched and stored data in localStorage. This means that the next time you visit the site, it will immediately show data from localStorage, and then update with the server's data when received.

This also means that you can store data even when offline. It will then send it to the server when coming online again. Even if you refresh or revisit the page later.

Mavo-offline also supports Mavo backends with server side pushes (e.g. [mavo-couchdb](https://github.com/valterkraemer/mavo-couchdb) and [mavo-firebase](https://github.com/valterkraemer/mavo-firebase)). That means it can update the view when there have been server side changes.

Tested with Mavo version 0.1.6.

## Examples

These examples have 4-way data-binding (View - Model - LocalStorage - DB) so if you open the examples in multiple windows, the data will be synchronized between them.

- To-Do List (CouchDB) - ([DEMO](https://valterkraemer.github.io/mavo-offline/examples/todo-couchdb/))
- To-Do List (Firebase) - ([DEMO](https://valterkraemer.github.io/mavo-offline/examples/todo-firebase/))

## Quick setup

1. Add `offline` to `mv-plugins`.
2. Add `offline?` before your expression in `mv-storage`
```
<main mv-app="todo"
  mv-plugins="offline"
  mv-storage="offline?couchdb=http://localhost:5984/mavo">

  ...
```
