import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePasswords = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
