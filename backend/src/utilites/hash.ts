import bcrypt from 'bcryptjs'

export const HashString = async (str: string, salt: string) => {
    const saltRounds = 10
    const bcryptSalt = await bcrypt.genSalt(saltRounds)
    const customSalt = salt + bcryptSalt

    const hashedString = await bcrypt.hash(str + customSalt, saltRounds)
    return hashedString
}

export const HashMatch = async (str: string, salt: string, hashedString: string) => {
    const salted = await HashString(str, salt)
    const isMatch = await bcrypt.compare(salted, hashedString)
    return isMatch
}