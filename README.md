# Mavo-offline-interceptor

A backend interceptor backend for [Mavo](https://mavo.io).

Mavo-offline-interceptor stores Mavo's fetched and stored data in localStorage. This means that the next time you visit the site, it will immediately show data from localStorage, and then update with the server's data when received.

This also means that you can store data even when offline. It will then store it to the server when coming online again. Even if you refresh or revisit the page later.

Mavo-offline-interceptor also supports Mavo backends with server side pushes (e.g. [mavo-pouchdb](https://github.com/valterkraemer/mavo-pouchdb) and [mavo-firebase](https://github.com/valterkraemer/mavo-firebase)). That means it can update the view when there have been server side changes.

## Examples

These examples have 4-way data-binding (View - Model - LocalStorage - DB) so if you open the examples in multiple windows, the data will be synchronized between them.

- To-Do List (PouchDB) - ([DEMO](https://valterkraemer.github.io/mavo-offline-interceptor/examples/todo-pouchdb/))
- To-Do List (Firebase) - ([DEMO](https://valterkraemer.github.io/mavo-offline-interceptor/examples/todo-firebase/))

## Setup mavo-offline-interceptor

Add mavo-offline-interceptor

    <script src="path/to/mavo-offline-interceptor.js"></script>

Add `offline-interceptor?` before your expression in `mv-storage`

E.g.
```
<main mv-app="todo"
  mv-storage="offline-interceptor?pouchdb=http://localhost:5984/mavo">

  ...
```

## Known issues

You cannot use `autocomplete="0"` because of a [bug in Mavo](https://github.com/mavoweb/mavo/issues/256). However you can use `autocomplete="0.001"` (wait 1ms).
