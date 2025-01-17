import mailModel from "./mail.model.js";
// import transporter from "./nodemailer.js";
import { v4 as uuid } from "uuid";
import { sendMail } from "./nodemailer.js";

export const trackerMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const trackerId = uuid();
  try {
    await mailModel.create({ trackerId, email });

    await sendMail(email, trackerId);
    return res.status(200).json({ trackerId });
  } catch (error) {
    console.error(error);
    return res.json({ message: "email with Tracking Pixel" });
  }
};

export const trackMail = async (req, res) => {
  try {
    const trackerId = req.params.id; // Get tracker ID from the route
    if (!trackerId) {
      return res.status(400).json({ error: "Tracking ID is required." });
    }

    // Extract user's IP address from headers or connection details
    const userIp =
      req.headers["true-client-ip"] || // Cloudflare
      req.headers["cf-connecting-ip"] || // Cloudflare
      req.headers["x-forwarded-for"]?.split(",")[0] || // Proxies
      req.ip || // Express's IP
      req.connection?.remoteAddress; // Fallback

    const track = await mailModel.findOne({ trackerId });
    if (!track) return res.status(404).json({ error: "Tracker Id not found" });

    if (!track.userIps.includes(userIp)) {
      track.userIps.push(userIp);
      track.opens++;
      await track.save();
    }

    // Respond with a transparent pixel
    res.setHeader("Content-Type", "image/png");
    res.sendFile("download.png", { root: "./public/images" }); // Adjust the path to your pixel
  } catch (error) {
    console.error("Error in trackMail:", error);
    res
      .status(500)
      .json({ error: "An error occurred while tracking the email." });
  }
};

export const trackerrMail = async (req, res) => {
  const trackerId = req.params.id;
  if (!trackerId)
    return res.status(400).json({ message: "tracking id is required" });

  try {
    const track = await mailModel.findOne({ trackerId });
    if (!track)
      return res.status(400).json({ message: "Tracking id not found" });
    return res.json({ track });
  } catch (error) {
    return res.json({
      message: "An error occurred while tracking the email",
      error: error.message,
    });
  }
};
