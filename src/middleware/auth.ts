import { Response, NextFunction } from 'express'
import { RequestWithJwt } from "../types";
import jwt from 'jsonwebtoken'

const config = process.env

export const verifyUserToken = (
  req: RequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  let token = req.headers.authorization
  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request')

  try {
    token = token.split(' ')[1] // Remove Bearer from string

    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request')

    if (!config.TOKEN_SECRET)
      return res.status(401).send('No token secret specified')

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET) // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request')

    req.user = verifiedUser // user_id & user_type_id

    return next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

export const IsUser = async (
  req: RequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  const userTypeId = req.user.user_type_id

  if (userTypeId === 0 || userTypeId === 1) {
    return next()
  }
  return res.status(401).send('Unauthorized!')
}

export const IsAdmin = async (
  req: RequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.user_type_id === 1) {
    return next()
  }
  return res.status(401).send('Unauthorized!')
}
