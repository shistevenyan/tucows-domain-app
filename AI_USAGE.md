# AI Usage

## AI tool used

I used **ChatGPT**.

## What the AI assisted with

I used AI mainly to generate functions and components for the core pieces of the domain management app. Based on my prompts, AI helped with:

- creating the `formatDate` utility from a strict formatting specification
- generating the reusable `StatusBadge` component
- generating the `DomainTable` component structure and styling
- generating the `FilterBar` component structure, props, emits, and responsive layout
- generating the `DomainDetailsDrawer` component structure and styling
- helping translate plain-English requirements into Vue 3 component scaffolding and scoped CSS

## What I modified or corrected

I reviewed the generated code and made changes where needed to better match the assignment requirements and application behavior.

Examples of changes I made include:

- adding `formatDate` after the initial table work so date values could be displayed consistently where formatting was needed
- adding the `StatusBadge` component into places where status needed a reusable visual treatment
- refining the `FilterBar` so the domain search updates **only on Enter** instead of triggering on every key press, to avoid unnecessary API requests
- making CSS adjustments for layout, spacing, responsiveness, and usability
- updating the `DomainDetailsDrawer` to use `StatusBadge` and `formatDate`
- improving error handling and empty states
- reviewed code for architecture, prop usage and event emission to make sure the data flow was correct
- ran functions and components using the test data to see that it is returning the correct behaviors

## How I validated the output

I validated the AI-assisted output through manual review and testing against the assignment requirements.

How I validated:

- comparing each generated file with the original requirements to make sure props, events, states, and UI behaviors were correct
- checking that components did not mutate props directly and that emitted events matched the required shapes
- verifying empty states such as no domains, missing registrar values, and missing nameservers
- confirming the drawer opened and closed correctly, including backdrop-click close behavior
- checking that the domain search behavior only updated on Enter after my modification
- checking the formatDate function behavior for valid and invalid inputs
- testing styling and responsiveness to ensure the UI behaved correctly on different screen sizes

## Summary and Prompts

AI was used to accelerate development, mainly for scaffolding and implementing components and function with detailed prompts.

### Date Format

Create a JavaScript utility function named "formatDate" that converts an ISO 8601 timestamp string into the user's local time and returns it in this exact display format:

M/D/YYYY h:mma

Examples of the required format:

- 1/1/2020 12:00am
- 7/8/2026 6:00pm

Requirements:

1. Input is a string such as "2020-01-01T00:00:00Z".
2. Convert the timestamp to the user's local timezone. Do not keep it in UTC unless the user's local timezone is UTC.
3. Function must use JavaScript Intl DateTimeFormat API.
4. Output must:
   - use numeric month/day/year
   - use 12-hour time
   - include minutes
   - use lowercase am / pm
   - not include seconds
   - not include a comma
   - not include leading zeroes on month, day, or hour
5. The function must work correctly across timezones, so the same ISO input may produce different results for different users.
6. Handle invalid input safely. Invalid ISO 8601 string and empty string will return "No Date"

### StatusBadge

Build a small reusable StatusBadge componentto display domain status using Vue 3, JavaScript and scoped CSS.
StatusBadge component will pass in one prop called status.
The status prop will be one of 3 values:

- active (green color badge)
- pendingTransfer (yellow color badge)
- clientHold (red color badge)

Requirements:

1. accepts a status prop
2. badge text is active turns to Active, pendingTransfer turns to Pending Transfer, clientHold turns to Client Hold
3. Handle invalid statuses (statuses that are not one of the 3 values) by display "Unknown" badge

Styling requirements:

1. Use scoped CSS only
2. renders a readable label with the correct color
3. Badge's width adjust to fit the text inside

### DomainTable

Build a component called DomainTable using Vue 3, JavaScript and scoped CSS.
DomainTable component will pass in one prop:

- the prop will be called domains
- domains will be an array of objects
- the object will have the shape of

```js
{
  domain: string,
  registrar: string,
  status: string,
  created_at: string,
  expires_at: string,
  nameservers: string[],
  updated_at: string
}
```

Requirements:
If there are no domains:

1. display a div saying "No Domains"

If there are domains:

1. Each row of the table will be one object from the domains array
2. The table should display domain, registrar, status, created date, expiry date
3. The table should display a "View" button in the each row
4. The table should clicking the "View" button should emit a select-domain event which will save the domain object of the row clicked
5. The table should not handle any formatting for the datetime strings

Styling requirements:

1. Use scoped CSS only
2. The table should be scrollable X axis wise if it overflows out of the screen
3. Include clear spacing, padding, borders, border-radius

### FilterBar

Build a component called FilterBar using Vue 3, JavaScript, and scoped CSS.

The component will be used reusable filter bar for a domain management table.

Requirements:

1. Accept a "filters" prop that is an object with:

- "domain"
- "registrar"
- "status"

2. Accept a "registrars" prop that is an array of strings
3. Emit an event named "update-filters" for when any of the 3 filter values are changed
4. When the user changes any field, emit only the changed field in this shape:

- { domain: value }
- { registrar: value }
- { status: value }

5. Safely handle missing or undefined filters (domain, registrar, status) values by falling back to empty strings
6. Do not mutate props directly
7. The input should read from the current domain filter value
8. The registrar select should render options from the "registrars" prop
9. The status select should use fixed options

- "All Statuses", value: ""
- "Active", value: "active"
- "Client Hold", value: "clientHold"
- "Pending Transfer", value: "pendingTransfer"

10. All controls should reflect the current filter values from props

Styling requirements:

1. Use scoped CSS only
2. The layout should be responsive:

- horizontal row layout on larger screens
- stacked vertical layout on smaller screens

3. Input and select controls should have consistent styling
4. Include clear spacing, padding, borders, border-radius, and focus styles

### DomainDetailsDrawer

Build a component called DomainDetailsDrawer using Vue 3, JavaScript and scoped CSS.

DomainDetailsDrawer component will pass in one prop:

- the prop will be called "domain"
- "domain" can be an object or null
- the object will have the shape of

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

Requirements:
If there is no domain:

1. do not render the drawer

If there is a domain:

1. render a backdrop covering the full screen
2. render a right-side drawer using an aside element
3. include a header with the domain name
4. include a "Close" button that emits a close event
5. clicking on the backdrop also emits a close event
6. display registrar, status, created date, expiry date, updated date, and nameservers
7. if registrar is missing, display "No Data"
8. if nameservers is missing or empty, display "None"
9. if nameservers exists, render each one as a list item

Styling requirements:

1. use scoped CSS only
2. backdrop should cover the full screen
3. drawer should be aligned to the right
4. drawer should take full height
5. drawer should have a responsive width of 500px or 100% depending which one is smaller
6. drawer should have padding
7. drawer content should scroll vertically if needed
8. include clear spacing between sections
9. use a vertical detail layout
10. each detail will be it's own row
