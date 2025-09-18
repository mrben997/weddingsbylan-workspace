### LayoutMakeup

1. Define.

```JSX
export const MakeupInstance = CreateLayoutMakeup({
  keyMapper: {'your-key': ''}
})
```

2. Layout Provider: **<root>/index.ts**

- **case 1: default**

```JSX
<Provider store={store}>
  <MakeupInstance.LayoutMakeup >
   <your-app>
  </MakeupInstance.LayoutMakeup>
</Provider>
```

- **case 2: overide**

```JSX
<Provider store={store}>
  <MakeupInstance.LayoutMakeup keyMapper={{'your-key': ''}}>
   <your-app>
  </MakeupInstance.LayoutMakeup>
</Provider>
```

3. Makeup.

```JSX
render() {
  return (
    <Wrap>
      {MakeupInstance.GetMakeup(<your-key>[])}
    </Wrap>
  )
}
```

4. Replace Makeup.

```JSX
render() {
  return (
    <Wrap>
      {MakeupInstance.ReplaceMake(<your-key>, <your-element>)}
    </Wrap>
  )
}

```
