import bcrypt from 'bcrypt';

const saltRounds = 10;

export class HashPassword{
    static hash(password: string) {
        throw new Error("Method not implemented.");
    }
    hash = async (salt: string, password: string): Promise<string> => {
        const hash = await bcrypt.hash(password + salt, saltRounds);
        return hash;
    };

    compare = async (salt: string, password: string, hash: string): Promise<boolean> => {
        const match = await bcrypt.compare(password + salt, hash);
        return match;
    };
}
