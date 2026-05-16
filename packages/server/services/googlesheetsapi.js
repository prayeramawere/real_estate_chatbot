import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = process.env.SPREADSHEET_ID;

export const addLead = async (lead) => {
  console.log("this function has been invoked", lead);
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  try {
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [lead],
      },
    });

    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    console.log("lead has been added successfully");
    return "successfully added lead";
  } catch (error) {
    console.log("ane error occured: ", error);
    return "error while adding lead";
  }
};
