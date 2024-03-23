//function to return the hashed password without

export default async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds, (error, hash) => {
        return error ? error: hash
    });
}