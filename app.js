import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./config/firebaseConfig.js";
config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
	res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.post("/uploadplayervalues", async (req, res) => {
	try {
		const docRef = await addDoc(collection(db, "playerDetails"), {
			firstName: req.body.formValues.firstName,
			middleName: req.body.formValues.middleName,
			lastName: req.body.formValues.lastName,
			mobileNumber: req.body.formValues.mobileNumber,
			dob: req.body.formValues.dob,
			nativeLoc: req.body.formValues.nativeLoc,
			playerRole: req.body.formValues.playerRole,
			playedNclBefore: req.body.formValues.playedNclBefore,
			playedNcl1: req.body.formValues.playedNcl1,
			playedNcl2: req.body.formValues.playedNcl2,
			playedNcl3: req.body.formValues.playedNcl3,
			playedNcl4: req.body.formValues.playedNcl4,
			occupation: req.body.formValues.occupation,
			sportsClub: req.body.formValues.sportsClub,
			educationInstitute: req.body.formValues.educationInstitute,
			playerImageUrl: req.body.formValues.playerImageUrl,
			razorpay_payment_id: req.body.razorpay_payment_id,
		});
		console.log("Document written with ID: ", docRef.id);
		res.status(200).json({ docid: docRef.id, success: true });
	} catch (error) {
		console.log("UNSUCCESSFULL: " + error);
	}
});

app.post("/uploadownervalues", async (req, res) => {
	try {
		const docRef = await addDoc(collection(db, "ownerDetails"), {
			teamName: req.body.formValues.teamName,
			companyName: req.body.formValues.companyName,
			businessNature: req.body.formValues.businessNature,
			instaLink: req.body.formValues.instaLink,
			ownerFullName: req.body.formValues.ownerFullName,
			ownerContactNumber: req.body.formValues.ownerContactNumber,
			ownerEmailId: req.body.formValues.ownerEmailId,
			ownerPresentAddress: req.body.formValues.ownerPresentAddress,
			ownerPermanentAddress: req.body.formValues.ownerPermanentAddress,
			managerFullName: req.body.formValues.managerFullName,
			managerContactNumber: req.body.formValues.managerContactNumber,
			managerEmailId: req.body.formValues.managerEmailId,
			managerPermanentAddress: req.body.formValues.managerPermanentAddress,
			managerPresentAddress: req.body.formValues.managerPresentAddress,
			ownerTeamLogo: req.body.formValues.ownerTeamLogo,
			razorpay_payment_id: req.body.razorpay_payment_id,
		});
		console.log("Document written with ID: ", docRef.id);
		res.status(200).json({ docid: docRef.id, success: true });
	} catch (error) {
		console.log("UNSUCCESSFULL: " + error);
	}
});

// const storageRef = ref(
//   storage,
//   `/playerImages/${e.target.files[0].name}`
// );
// const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
// uploadTask.on(
//   "state_changed",
//   (snapshot) => {},
//   (error) => {
//     console.log(error);
//   },
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//       setFormValues({ ...formValues, ["playerImageUrl"]: url });
//     });
//   }
// );
