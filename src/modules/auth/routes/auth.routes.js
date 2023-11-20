import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import passport from 'passport'

const authRouter = Router()

authRouter.get('/login', passport.authenticate('facebook', { scope: 'email' }))

authRouter.get('/callback', passport.authenticate('facebook', {
    successRedirect: "/auth/facebook/success",
    failureRedirect: "/auth/facebook/error"
  })
)

authRouter.get('/auth/facebook/success', async (req, res) => {
  res.send('Success')
})

authRouter.get('/auth/facebook/error', async (req, res) => {
  res.send('Error')
})

export default authRouter