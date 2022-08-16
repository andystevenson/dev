const auth = {
  type: 'OAuth2',
  user: process.env.EMAIL_USER,
  clientId: process.env.EMAIL_CLIENT_ID,
  clientSecret: process.env.EMAIL_CLIENT_SECRET,
  refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  accessToken: null,
}

const nodemailer = require('nodemailer')
exports.handler = async function (event) {
  console.log('functions/email', process.env.URL)

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth,
  })

  let message = JSON.parse(event.body)
  const to = 'to' in message ? message.to : 'andystevenson@mac.com'
  const subject = 'subject' in message ? message.subject : 'Hello'
  const text = 'text' in message ? message.text : null
  const html = 'html' in message ? message.html : null

  let email = {
    from: auth.user,
    to,
    subject,
  }

  if (text) email = { ...email, text }
  if (html) email = { ...email, html }

  try {
    await transport.sendMail(email)
    console.log('sendMail success')
    return { statusCode: 200, body: 'Ok' }
  } catch (error) {
    console.log('sendMail ', { error })
    return { statusCode: 500, body: error.message }
  }
}
