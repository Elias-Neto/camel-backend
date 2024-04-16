import nodemailer from 'nodemailer'
import { google } from 'googleapis'

/*POPULATE BELOW FIELDS WITH YOUR CREDETIALS*/

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const MY_EMAIL = process.env.MY_EMAIL

/*POPULATE ABOVE FIELDS WITH YOUR CREDETIALS*/

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

//YOU CAN PASS MORE ARGUMENTS TO THIS FUNCTION LIKE CC, TEMPLATES, ATTACHMENTS ETC. IM JUST KEEPING IT SIMPLE
export const sendEmail = async (to, subject, messageBody) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken()
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MY_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  })

  //EMAIL OPTIONS
  const mailOptions = {
    from: MY_EMAIL,
    to: to,
    subject: subject,
    text: messageBody,
  }

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) reject(err)
      resolve(info)
    })
  })
}
