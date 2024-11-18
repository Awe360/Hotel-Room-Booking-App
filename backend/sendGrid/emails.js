import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Load environment variables
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendVerificationEmail = async (email, verificationToken) => {
	const msg = {
	  to: email,
	  from: process.env.SENDER_EMAIL, // Use a verified sender email
	  subject: 'Verify your email',
	  html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
	  category: 'Email Verification',
	};
  
	try {
	  await sgMail.send(msg);
	  console.log('Verification email sent successfully');
	} catch (error) {
	  console.error(`Error sending verification email: ${error}`);
	  throw new Error(`Error sending verification email: ${error.message}`);
	}
  };
  export const sendWelcomeEmail = async (email, name) => {
	const msg = {
	  to: email,
	  from: process.env.SENDER_EMAIL,
	  templateId: process.env.templateId,
	  dynamic_template_data: {
		name: name,
	  },
	};
  
	try {
	  await sgMail.send(msg);
	  console.log('Welcome email sent successfully');
	} catch (error) {
	  console.error(`Error sending welcome email: ${error}`);
	  throw new Error(`Error sending welcome email: ${error.message}`);
	}
  };
  export const sendPasswordResetEmail = async (email, resetURL) => {
	const msg = {
	  to: email,
	  from: process.env.SENDER_EMAIL,
	  subject: 'Reset your password',
	  html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetURL),
	  category: 'Password Reset',
	};
  
	try {
	  await sgMail.send(msg);
	  console.log('Password reset email sent successfully');
	} catch (error) {
	  console.error(`Error sending password reset email: ${error}`);
	  throw new Error(`Error sending password reset email: ${error.message}`);
	}
  };
  export const sendResetSuccessEmail = async (email) => {
	const msg = {
	  to: email,
	  from: process.env.SENDER_EMAIL,
	  subject: 'Password Reset Successful',
	  html:PASSWORD_RESET_SUCCESS_TEMPLATE,
	  category: 'Password Reset Success',
	};
  
	try {
	  await sgMail.send(msg);
	  console.log('Password reset success email sent successfully');
	} catch (error) {
	  console.error(`Error sending password reset success email: ${error}`);
	  throw new Error(`Error sending password reset success email: ${error.message}`);
	}
  };

// export const sendVerificationEmail = async (email, verificationToken) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Verify your email",
// 			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
// 			category: "Email Verification",
// 		});

// 		console.log("Email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending verification`, error);

// 		throw new Error(`Error sending verification email: ${error}`);
// 	}
// };

// export const sendWelcomeEmail = async (email, name) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			template_uuid: "97d25584-b5b3-4060-98b9-4545f89c4ee6",
// 			template_variables: {
// 				company_info_name: "Hotel Room Booking App",
// 				name: name,
// 			},
// 		});

// 		console.log("Welcome email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending welcome email`, error);

// 		throw new Error(`Error sending welcome email: ${error}`);
// 	}
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Reset your password",
// 			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
// 			category: "Password Reset",
// 		});
// 	} catch (error) {
// 		console.error(`Error sending password reset email`, error);

// 		throw new Error(`Error sending password reset email: ${error}`);
// 	}
// };

// export const sendResetSuccessEmail = async (email) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Password Reset Successful",
// 			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
// 			category: "Password Reset",
// 		});

// 		console.log("Password reset email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending password reset success email`, error);

// 		throw new Error(`Error sending password reset success email: ${error}`);
// 	}
// };
