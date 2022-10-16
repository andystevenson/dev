// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const today = dayjs().startOf('day')
const year = today.year()
const lastOctober =
  today.month() >= 9
    ? today.month(9).date(1)
    : today
        .year(year - 1)
        .month(9)
        .date(1)

console.log(today.format(), lastOctober.format())
console.log(today.unix(), lastOctober.unix())
console.log(today.utc().format(), lastOctober.utc().format())
console.log(today.utc().unix(), lastOctober.utc().unix())

export const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
