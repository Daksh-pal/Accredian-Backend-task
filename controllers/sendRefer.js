import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const sendRefer = async (req, res) => {
    const {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        courseName,    
    } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
        return res.status(400).json({ error: 'All fields except Course Name are required' });
    }

    try {
        const existingReferral = await prisma.referral.findUnique({
            where: {
                referrerEmail_refereeEmail: {
                    referrerEmail,
                    refereeEmail,               
                },
            },
        });

        if (existingReferral) {
            return res.status(400).json({ error: 'Referral already exists for this referrer and referee combination' });
        }

        const referral = await prisma.referral.create({
            data: {
                referrerName,
                referrerEmail,
                refereeName,
                refereeEmail,
                courseName,
            },
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'danial.senger49@ethereal.email',
                pass: 'YGHEyRGsrzJ7aDRwG3'
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: refereeEmail,
            subject: `Referral for ${courseName}`,
            text: `Hi ${refereeName},\n\n${referrerName} has referred you for the course ${courseName}.\n\nBest regards,\nYour Company`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Referral created and email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default sendRefer;
