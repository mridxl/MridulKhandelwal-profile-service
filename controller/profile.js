import { sha512 } from 'js-sha512';

export const getHealth = (c) => {
	return c.text('Profile Service - Health Verified');
};

export const getProfile = async (c) => {
	try {
		const token = c.req.header('Authorization');
		if (!token) {
			return c.text('Unauthorized Access, Hash Not Found', 401);
		}

		const field = token.split(' ');
		const hash = field[1];

		// Use SHA-512 instead of bcrypt (Cloudflare Workers don't support bcrypt)
		const storedHash = sha512(c.env.CHAIN_CODE);

		if (storedHash !== hash) {
			return c.text('Invalid Hash', 401);
		}

		return c.json({
			first_name: c.env.FIRST_NAME,
			last_name: c.env.LAST_NAME,
			email: c.env.EMAIL,
			phone: c.env.PHONE,
			yoe: parseInt(c.env.YOE),
			company: c.env.COMPANY,
			designation: c.env.DESIGNATION,
			github_id: c.env.GITHUB_ID,
			linkedin_id: c.env.LINKEDIN_ID,
			twitter_id: c.env.TWITTER_ID,
			instagram_id: c.env.INSTAGRAM_ID,
			website: c.env.WEBSITE,
		});
	} catch (err) {
		console.error(`Error while getting profile data: ${err}`);
		return c.text('Error getting profile data', 500);
	}
};

export const verification = async (c) => {
	try {
		const body = await c.req.json();
		if (!body.salt) {
			return c.text('Salt not found', 404);
		}

		const hash = sha512(body.salt + c.env.CHAIN_CODE);
		return c.json({ hash });
	} catch (err) {
		console.error(`Error while verification: ${err}`);
		return c.text('Error while encryption', 500);
	}
};
