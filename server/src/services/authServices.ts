import express from 'express';

class AuthServices {
    static async login(req: express.Request, res: express.Response) {
        const { username, password } = req.body;
        console.log(username, password);
        res.send("Login successful");
    }

    static async signup(req: express.Request, res: express.Response) {
        const { username, password } = req.body;
        console.log(username, password);
        res.send("Signup successful");
    }
}

export default AuthServices;