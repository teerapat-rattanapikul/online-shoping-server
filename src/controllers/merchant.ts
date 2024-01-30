import { NextFunction, Request, Response } from 'express';
import Merchant from '../models/merchant';
import { hashPassword, comparePasswords } from '../utils/bcrypt'

const createMerchant = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.headers
  try {
    const findExistingMerchant = await Merchant.findOne({ username })
    if (findExistingMerchant) {
      throw new Error('ไม่สามารถใช้ Username นี้ได้')
    } else {
      const newHashPassword = await hashPassword(String(password))

      const result = await Merchant.create({
        username,
        password: newHashPassword
      })
  
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

const loginMerchant = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.headers
  try {
    const findExistingUser = await Merchant.findOne({ username })

    if (findExistingUser) {
      const isCorrectPassword = await comparePasswords(String(password), findExistingUser.password)

      if (!isCorrectPassword) throw new Error('รหัสผ่านไม่ถูกต้อง')

      res.json(findExistingUser)
    } else {
      throw new Error('ไม่พบ Username นี้ในระบบ')
    }

  } catch (error) {
    next(error)
  }
}

export {
  createMerchant,
  loginMerchant
}