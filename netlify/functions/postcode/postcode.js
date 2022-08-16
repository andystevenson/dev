// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

// use getAddress.io to fetch POSTCODE information

const axios = require('axios')

const url = 'https://api.getAddress.io/find/'

const handler = async (event) => {
  try {
    const postcode = event.queryStringParameters.postcode || 'B91 1AH'
    const params = `${postcode}?api-key=${process.env.GETADDRESS_API_KEY}`
    const { data } = await axios.get(`${url}${params}`)

    const { addresses } = data

    if (!addresses.length) {
      // postcode format may have been okay but no addresses found
      return {
        statusCode: 400,
        body: JSON.stringify(
          { Message: 'no addresses found at that postcode' },
          null,
          2,
        ),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data, null, 2),
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error.response.data, null, 2),
    }
  }
}

module.exports = { handler }
