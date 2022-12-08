# React Localstorage Sync

React hooks api to synchronize localstorage as a state across browser tabs

Start with

```bash
  yarn add use-localstorage-sync
```

and can be used as a state hook in any React component

```javascript
+ import useLocalStorage from "use-localstorage-sync";

+ const [value, setValue] = useLocalStorage("key");
```

Similar to the useState hook,  the `value` in the associated key is updated in localstorage, it is updated. Similarly, the `setValue` updates the state in all associated browser tabs simulataneously.
