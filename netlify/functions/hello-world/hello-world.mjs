// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'Europe/London'
const todayUK = dayjs().tz(tz).startOf('day')
const today = dayjs().utc().startOf('day')

console.log(today, todayUK)
console.log(today.unix(), todayUK.unix())
console.log(today.format(), todayUK.format())

const lastOctoberUK =
  todayUK.month() >= 9
    ? todayUK.month(9).date(1)
    : todayUK
        .year(year - 1)
        .month(9)
        .date(1)

const lastOctober =
  today.month() >= 9
    ? today.month(9).date(1)
    : today
        .year(year - 1)
        .month(9)
        .date(1)

// const lastOctoberUK = lastOctober.tz(tz)
console.log('oct1', lastOctober, lastOctoberUK)
console.log('oct1', lastOctober.unix(), lastOctoberUK.unix())
console.log('oct1', lastOctober.format(), lastOctoberUK.format())

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
