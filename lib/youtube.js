import { google } from "googleapis";

export default async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  const youtube = google.youtube({
    auth,
    version: "v3",
  });

  const response = await youtube.channels.list({
    id: "UC1Z-a8i2Ce4oIEMV-S3iFrg",
    part: "statistics",
  });

  const channel = response.data.items[0];
  const { subscriberCount, viewCount } = channel.statistics;

  return {
    subscriberCount,
    viewCount,
  };
};
