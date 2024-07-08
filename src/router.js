const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { json } = require('express/lib/response');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if(!foundUser) {
        const passwordHash = await bcrypt.hash(password, 10)

        const createdUser = await prisma.user.create({
            data: {
                username,
                password: passwordHash
            }
        })

        res.json({
            user: createdUser
        })
    } else {
        res.json({
            message: 'Username already taken'
        })
    }
});

router.post('/login', async (req, res) => {
    
});

module.exports = router;
