const nodemailer = require("nodemailer");

const mailerBot = nodemailer.createTransport({
	host: "127.0.0.1",
	port: 1025,
	secure: false,
	auth: {
		user: process.env.SMTP_AUTH_USER,
		pass: process.env.SMTP_AUTH_PASS,
	},
	requireTLS: true,
	tls: {
		// required for protonmail
		rejectUnauthorized: false,
	},
});

module.exports = mailerBot;