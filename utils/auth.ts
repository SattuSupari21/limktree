import jwt from "jsonwebtoken"

const secretKey = 'your-secret-key'; // Replace with a strong, unique secret key

export const generateToken = (payload: string | object | Buffer) => {
    return jwt.sign(payload, secretKey); // Adjust the expiration as needed
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};
