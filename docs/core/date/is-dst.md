# DST Check

Determining if a `Date` object is in Daylight Saving Time (DST). The functionality is extended to
both instance and static methods for `Date`, as well as a standalone function.

## 1. `Date.prototype.isDST`

### Description:

Adds an instance method `isDST` to the `Date` prototype. This method checks if the current `Date`
object (i.e., `this`) is in Daylight Saving Time (DST).

### Syntax:

```typescript
const date = new Date();
const isDST = date.isDST();
```

### Parameters:

- **None**: This method operates on the current `Date` object (i.e., `this`).

### Returns:

- **boolean**:
  - `true` if the current `Date` instance is in DST.
  - `false` if the `Date` instance is not in DST.

### Example:

```typescript
const date = new Date();
console.log(date.isDST()); // true or false based on DST status of the current date
```

---

## 2. `Date.isDST`

### Description:

Adds a static method `isDST` to the `Date` constructor. This method checks if the provided `Date`
object is in Daylight Saving Time (DST).

### Syntax:

```ts
const isDST = Date.isDST(new Date());
```

### Parameters:

- **date** (`Date`): The `Date` object to check.

### Returns:

- **boolean**:
  - `true` if the provided `Date` object is in DST.
  - `false` if the `Date` object is not in DST.

### Example:

```typescript
const date = new Date();
console.log(Date.isDST(date)); // true or false based on DST status of the provided date
```

---

## 3. `isDST` (Standalone Function)

### Description:

Standalone function that checks if the provided `Date` object is in Daylight Saving Time (DST).

### Syntax:

```typescript
const date = new Date();
const isDST = isDST(date);
```

### Parameters:

- **date** (`Date`): The `Date` object to check.

### Returns:

- **boolean**:
  - `true` if the provided `Date` object is in DST.
  - `false` if the `Date` object is not in DST.

### Example:

```ts
const date = new Date();
console.log(isDST(date)); // true or false based on DST status of the provided date
```

---

## Helper Function: `calculateDST`

### Description:

Helper function used internally to determine if the provided `Date` object is in DST by comparing
the current time zone offset with the offsets for January and July of the same year.

### Syntax:

```ts
calculateDST(date);
```

### Parameters:

- **date** (`Date`): The `Date` object to check.

### Returns:

- **boolean**:
  - `true` if the provided `Date` object is in DST.
  - `false` if the `Date` object is not in DST.

### Example:

```typescript
const date = new Date();
console.log(calculateDST(date)); // true or false based on DST status of the current date
```

---

## Example Usage

### Instance Method:

```ts
const date1 = new Date();
console.log(date1.isDST()); // true or false based on DST status of the current date
```

### Static Method:

```ts
const date2 = new Date();
console.log(Date.isDST(date2)); // true or false based on DST status of the provided date
```

### Standalone Function:

```ts
const date3 = new Date();
console.log(isDST(date3)); // true or false based on DST status of the provided date
```

---

## Notes:

- The DST status is determined by comparing the time zone offset of the current `Date` object (or
  the provided `Date` object) with the offsets for January and July of the same year.
- If the current time zone offset is smaller than the maximum of these offsets, it is considered
  Daylight Saving Time.
