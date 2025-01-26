
import jwt from 'jsonwebtoken'

const generatedTokenAndCookie = (user, res) => {
    const payload = { id: user._id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15d' })

    res.cookie('jwt', token, { maxAge: 15 * 24 * 60 * 60 * 1000, expiresIn: '15d', httpOnly: true })
}

export default generatedTokenAndCookie