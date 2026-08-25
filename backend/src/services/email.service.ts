import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "../utils/logger";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: env.SMTP_USER
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
    });
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    try {
      if (!env.SMTP_USER) {
        logger.info(`[MOCK EMAIL] To: ${to} | Subject: ${subject} | Text: ${text}`);
        return { messageId: `mock-${Date.now()}` };
      }

      const info = await this.transporter.sendMail({
        from: env.SMTP_FROM,
        to,
        subject,
        text,
        html: html || text,
      });

      logger.info(`📧 Email sent to ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`❌ Failed to send email to ${to}:`, error);
      // We don't crash requests on email failures
      return null;
    }
  }

  async sendContactNotificationToAdmin(submission: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) {
    const subject = `🚀 New Scaleminte Inquiry from ${submission.firstName} ${submission.lastName}`;
    const text = `You received a new inquiry on Scaleminte:\n\nName: ${submission.firstName} ${submission.lastName}\nEmail: ${submission.email}\nMessage:\n${submission.message}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #040822; margin-bottom: 20px;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <p style="margin: 0; color: #334155;"><strong>Message:</strong></p>
          <p style="margin-top: 5px; color: #475569; white-space: pre-line;">${submission.message}</p>
        </div>
      </div>
    `;

    return this.sendMail({
      to: env.ADMIN_NOTIFICATION_EMAIL,
      subject,
      text,
      html,
    });
  }

  async sendContactConfirmationToUser(submission: {
    firstName: string;
    email: string;
  }) {
    const subject = "Thank you for contacting Scaleminte!";
    const text = `Hi ${submission.firstName},\n\nThank you for reaching out to Scaleminte. We have received your message and our strategy team will get back to you within 24 hours.\n\nBest regards,\nThe Scaleminte Team`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #040822;">Thank you for contacting Scaleminte!</h2>
        <p>Hi ${submission.firstName},</p>
        <p>We've received your message and appreciate your interest in partnering with us.</p>
        <p>Our team is reviewing your details and will get back to you with a custom strategy within <strong>24 hours</strong>.</p>
        <br/>
        <p style="color: #64748b; font-size: 14px;">Best regards,<br/><strong>The Scaleminte Team</strong><br/>hello@scaleminte.com</p>
      </div>
    `;

    return this.sendMail({
      to: submission.email,
      subject,
      text,
      html,
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const subject = "Password Reset Request - Scaleminte";
    const text = `You requested a password reset for your Scaleminte account. Click the following link to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour. If you didn't request this, you can safely ignore this email.`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #040822;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <div style="margin: 25px 0;">
          <a href="${resetUrl}" style="background-color: #1b43ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="color: #64748b; font-size: 13px;">This link will expire in 1 hour. If you did not make this request, please ignore this email.</p>
      </div>
    `;

    return this.sendMail({
      to: email,
      subject,
      text,
      html,
    });
  }
}

export const emailService = new EmailService();
