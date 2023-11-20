import express from 'express'
import authRouter from './modules/auth/routes/auth.routes.js'
import passport from 'passport'
import { Strategy } from 'passport-facebook'
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient()

app.use(express.json())

app.use(authRouter)

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    async function(accessToken, refreshTocken, profile, cb) {
      const { name } = profile._json;
      await prisma.user.create({
        data: {
          name
        }
      })
      cb(null, name)
    }
  )
)

app.listen(3000, () => console.log('Server listening on port 3000'))

