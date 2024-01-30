import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, comparePasswords } from '../utils/bcrypt'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.headers
  try {
    const findExistingUser = await User.findOne({ username })
    if (findExistingUser) {
      throw new Error('ไม่สามารถใช้ Username นี้ได้')
    } else {
      const newHashPassword = await hashPassword(String(password))

      const result = await User.create({
        username,
        password: newHashPassword
      })
  
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.headers
  try {
    const findExistingUser = await User.findOne({ username })

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
  createUser,
  loginUser
}