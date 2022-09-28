import { instance } from "../server.js";
import crypto from "crypto";
import axios from "axios";

var formValues = {};
var collectionName = "";
export const checkout = async (req, res) => {
	formValues = req.body.formValues;
	collectionName = req.body.collectionName;
	const options = {
		amount: Number(req.body.amount * 100),
		currency: "INR",
	};
	const order = await instance.orders.create(options);

	res.status(200).json({
		success: true,
		order,
	});
};

export const paymentVerification = async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		req.body;
	console.log(req.body);
	const body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
		.update(body.toString())
		.digest("hex");

	const isAuthentic = expectedSignature === razorpay_signature;

	if (isAuthentic) {
		var name = "";
		var phone = "";
		var amount = "";
		// Database comes here
		if (collectionName === "owner") {
			name = formValues.ownerFullName;
			phone = formValues.ownerContactNumber;
			amount = "5000";
			const {
				data: { success },
			} = await axios.post("http://54.250.201.101:5004/uploadownervalues", {
				formValues,
				razorpay_payment_id,
			});
			console.log(success);
		} else if (collectionName === "player") {
			name = formValues.firstName;
			phone = formValues.mobileNumber;
			amount = "200";
			const {
				data: { success },
			} = await axios.post("http://54.250.201.101:5004/uploadplayervalues", {
				formValues,
				razorpay_payment_id,
			});
			console.log(success);
		}

		res.redirect(
			`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}&name=${name}&phone=${phone}&amount=${amount}`
		);
	} else {
		res.status(400).json({
			success: false,
		});
	}
};
