import Session from "../models/Session.js";
import { StreamClient } from "@stream-io/node-sdk";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    //generate a unique callId for stream videos
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await Session.create({
      //creating a session in the db
      problem,
      difficulty,
      host: userId,
      callId,
    });

    await StreamClient.video.call("default", callId).getOrCreate({
      //creating a stream video call
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    res.status(201).json({ session });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getActiveSessions(req, res) {}

export async function getMyRecentSessions(req, res) {}

export async function getSessionById(req, res) {}

export async function joinSession(req, res) {}

export async function endSession(req, res) {}
