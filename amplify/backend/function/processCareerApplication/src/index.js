const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'us-east-1' });
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TO_EMAIL = process.env.TO_EMAIL || "drewstake3@gmail.com"; // Change to verified email

exports.handler = async (event) => {
    console.log("EVENT:", JSON.stringify(event, null, 2));

    // Check if it's an S3 event (file upload)
    if (event.Records[0].eventSource === "aws:s3") {
        return handleS3Upload(event);
    }
    
    // Otherwise, assume it's a DynamoDB event
    return handleDynamoDBStream(event);
};

// Handle new resume uploads to S3
async function handleS3Upload(event) {
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
        const resumeUrl = `https://${bucket}.s3.amazonaws.com/${key}`;

        // Send email notification
        await sendEmail({
            subject: "New Resume Uploaded",
            body: `A new resume has been uploaded.\n\nDownload it here: ${resumeUrl}`,
        });

        console.log("S3 Resume Uploaded:", resumeUrl);
    }
    return { statusCode: 200, body: "S3 Upload processed successfully" };
}

// Handle new career applications in DynamoDB
async function handleDynamoDBStream(event) {
    for (const record of event.Records) {
        if (record.eventName !== "INSERT") continue;

        const newItem = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
        const { id, name, email, resumeUrl, appliedAt } = newItem;

        const subject = `New Job Application: ${name}`;
        const body = `
            A new job application has been submitted.
            
            Name: ${name}
            Email: ${email}
            Applied At: ${appliedAt}
            
            Resume: ${resumeUrl}
        `;

        await sendEmail({ subject, body });
        console.log("DynamoDB New Application:", newItem);
    }
    return { statusCode: 200, body: "DynamoDB Stream processed successfully" };
}

// Send Email via SES
async function sendEmail({ subject, body }) {
    const params = {
        Destination: { ToAddresses: [TO_EMAIL] },
        Message: {
            Body: { Text: { Data: body } },
            Subject: { Data: subject },
        },
        Source: TO_EMAIL, // Must be a verified email in SES
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log("Email sent successfully:", data);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
