'use server'
import nodemailer from 'nodemailer'

// Environment variables
const SMTP_HOST = process.env.EMAIL_HOST
const SMTP_PORT = process.env.EMAIL_PORT
const SMTP_SECURE = process.env.EMAIL_SECURE
const SMTP_USER = process.env.EMAIL_USER
const SMTP_PASS = process.env.EMAIL_PASS
const SMTP_FROM = process.env.EMAIL_FROM
const SMTP_FROM_NAME = process.env.EMAIL_FROM_NAME

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT) || 465,
  secure: SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

// Send course registration email (generic function that receives HTML and text)
export async function sendCourseRegistrationEmail(email, subject, html, text) {
  try {
    const mailOptions = {
      from: `${SMTP_FROM_NAME || 'Nivex Education'} <${SMTP_FROM || SMTP_USER}>`,
      to: email,
      subject: subject,
      text,
      html,
      replyTo: SMTP_FROM || SMTP_USER,
      headers: {
        'X-Mailer': 'Nivex.vn',
        'List-Unsubscribe': `<mailto:${SMTP_FROM || SMTP_USER}?subject=Unsubscribe>`,
        'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN',
        'Return-Path': SMTP_FROM || SMTP_USER,
        'Organization': 'Nivex - nivex.vn',
      }
    }

    const info = await transporter.sendMail(mailOptions)
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully'
    }
    
  } catch (error) {
    return { 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    }
  }
}