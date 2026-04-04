Create a JavaScript utility function named `formatDate` that converts an ISO 8601 timestamp string into the user's local time and returns it in this exact display format:

M/D/YYYY h:mma

Examples of the required format:

- `1/1/2020 12:00am`
- `7/8/2026 6:00pm`

Requirements:

1. Input is a string such as `2020-01-01T00:00:00Z`.
2. Convert the timestamp to the user's local timezone. Do not keep it in UTC unless the user's local timezone is UTC.
3. Function must use JavaScript Intl DateTimeFormat API.
4. Output must:
   - use numeric month/day/year
   - use 12-hour time
   - include minutes
   - use lowercase `am` / `pm`
   - not include seconds
   - not include a comma
   - not include leading zeroes on month, day, or hour
5. The function must work correctly across timezones, so the same ISO input may produce different results for different users.
6. Handle invalid input safely. Invalid ISO 8601 string and empty string will return "No Date"

I want to display domain status using a small reusable StatusBadge component in Vue 3.
StatusBadge will pass in one prop called status.
The status prop will be one of 3 values:

- active (green color badge)
- pendingTransfer (yellow color badge)
- clientHold (red color badge)

Requirements:

1. accepts a status prop
2. normalizes inconsistent casing (active turns to Active, pendingTransfer turns to Pending Transfer, clientHold turns to Client Hold)
3. renders a readable label with the correct color
