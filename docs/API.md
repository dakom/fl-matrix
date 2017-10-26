# Fantasy-Land Matrix - API

TODO - Auto-generate proper api docs (and edit this page!)

Note - `map` and `reduce` are not fantasy-land compatible. In other words, they won't work with S.map/S.reduce.

The reason is that it's usually more important to have the metadata (row/column/index) than to have it be a pure operation with only number -> number, but modifying that metadata on return doesn't make sense.

However, `map` and `reduce` _are_ totally fine and usable in a functional approach :)

For example:

```
const allOnes = empty (3) (3).map(() => 1);
const seq = allOnes.map(el => el.index);

/* allOnes:
1 1 1
1 1 1
1 1 1
*/

/* seq: (column-major order like webgl)
0 3 6
1 4 7
2 5 8
*/
```