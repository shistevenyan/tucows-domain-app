# Domain Records Explorer

---

## Setup

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm run test
```

---

## Approach

The main page is used for fetching domain data, reading and updating route query filters, filtering results, and keeping track of the selected domain for the details drawer.

Reusable components are used for rendering the filters, the table, the status badge, and the details drawer.

I used URL search params for filters so the state is shareable and saved on refresh.

---

## Component Structure

### `DomainExplorerPage.vue`

Responsible for:

- fetching domain data
- handling loading and error states
- reading filters from the URL search params
- updating URL query params
- managing selected domain state

### `FilterBar.vue`

Responsible for:

- renders filter inputs (search bar, registrar dropdown, status dropdown)
- receives current filter values from DomainExplorerPage
- emits filter updates to DomainExplorerPage

### `DomainTable.vue`

Responsible for:

- rendering the domain list
- showing an empty state
- emitting `select-domain` when a row "View" button is selected

### `DomainDetailsDrawer.vue`

Responsible for:

- displaying full domain details
- showing nothing when no domain is selected
- emitting `close` when "Close" button or backdrop is clicked

### `StatusBadge.vue`

Responsible for:

- mapping domain status to a readable label
- applying the correct badge colors
- handling incorrect statuses

### Utilities

Examples:

- `formatDate`
- `filterDomains`

These keep formatting and filtering logic outside the components and reusable.

---

## Assumptions

- each domain has this shape:

```js
{
  domain: string,
  registrar: string,
  status: string,
  created_at: string,
  expires_at: string,
  updated_at: string,
  nameservers: string[]
}
```

- missing registrar displays as `No Data`
- missing or empty nameservers display as `None`
- date strings are ISO timestamps
- filters are case-insensitive
- the dataset is small enough for client-side filtering
- URL search params were added so filters stays on refresh and can be shared
- responsive design was included so the layout works across screen sizes
- the domain search uses the approach by updating only when the user presses Enter, rather than on every keypress to prevent multiple API calls

---

## Tradeoffs

### Client-side filtering

I used client-side filtering.

**Pros**

- easy to implement
- fast for small datasets

**Cons**

- not good for large datasets
- client needs to fetch all the data first and filter after

### Query params for filters

I stored filters in the URL.

**Pros**

- shareable state
- refresh-safe

**Cons**

- needs router logic

### Drawer for domain details

I used a drawer instead of a separate page.

**Pros**

- quickly browse specific domain details
- simple read-only experience

**Cons**

- could feel cramped if there are more details even though the Y-axis is scrollable

### Responsive design

I made sure that the app would work for different screen sizes and resolutions.

**Pros**

- usable app across all different devices

**Cons**

- added complexity with CSS

---

## Backend API Proposal

### Endpoints

```http
GET /api/domains
```

### Query parameters for `GET /api/domains`

- `page`: what page the pagination is on
- `pageSize`: how many items are in a page
- `domain`: the string to filter on domain name
- `registrar`: the string to filter on registrar name
- `status`: the enum (active, clientHold, pendingTransfer) to filter on status

### Example request

```http
GET /api/domains?page=number&pageSize=number&domain=string&registrar=string&status=string
```

### List response

```json
{
  "data": [
    {
      "id": "1",
      "domain": "example.com",
      "registrar": "Registrar 1 Inc",
      "status": "active",
      "created_at": "2020-01-01T00:00:00Z",
      "expires_at": "2026-01-01T00:00:00Z",
      "updated_at": "2025-12-01T10:30:00Z",
      "nameservers": ["ns1.example.com", "ns2.example.com"]
    },
    ...
  ],
  "metadata": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 57,
    "totalPages": 3
  }
}
```

### Filtering strategy

- `domain`: partial, case-insensitive match
- `registrar`: exact match
- `status`: exact match (active, pendingTransfer, clientHold)
- multiple filters combine with `AND`

```sql
  SELECT stuff FROM domains d
  LEFT JOIN status s ON d.domain_id = s.domain_id
  WHERE s.status = "active"
  AND d.domain_name LIKE CONCAT('%', example, '%')
  AND d.registrar = 'Tucows'
  LIMIT pageSize OFFSET (page - 1) * pageSize;
```

- backend then builds the metadata (page number, total items, total pages)

### Pagination considerations

I would use page-based pagination for this project:

- `page`
- `pageSize`

Response metadata should include:

- `page`
- `pageSize`
- `totalItems`
- `totalPages`

### Error response format

```json
{
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "This is some error message"
  }
}
```

Typical errors:

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

---

## Future Improvements

- move filtering and pagination to the backend for scalability
- improve drawer accessibility (right now can only really be accessed with mouse)
- expand on more testing (integration and E2E testing)
- improve loading and error states (upgrade to spinners)
- connect the UI to a real backend API
