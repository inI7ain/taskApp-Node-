const mailerBot = require("../email/mailerBot");

const mailController = {
	sendWelcomeEmail(email, name) {
		mailerBot.sendMail({
			to: email,
			from: "vain-nodemailer@pm.me",
			subject: "Welcome!",
			text: `Welcome to the app, ${name}. Let us know what your thoughts are on the app.`,
		});
	},
	sendGoodbyeEmail(email, name) {
		mailerBot.sendMail({
			to: email,
			from: "vain-nodemailer@pm.me",
			subject: "Account deleted",
			text: `Hello ${name}. We're sad to see you go. Could you describe your reasons for leaving?`,
		});
	},
};

module.exports = mailController;
