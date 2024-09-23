require('dotenv').config();

const AWS = require('aws-sdk');

// Configure the AWS region and credentials using environment variables
AWS.config.update({
    region: process.env.AWS_REGION,  // Use the region from .env file
    credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Use the access key from .env file
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY  // Use the secret key from .env file
    })
});

// Create an instance of the Lambda service
const lambda = new AWS.Lambda();

// Function to invoke the Lambda function
const invokeLambda = async () => {
    const params = {
        FunctionName: 'printfilename', // Replace with your Lambda function name
        InvocationType: 'RequestResponse', // Use 'Event' for asynchronous invocation if desired
        Payload: JSON.stringify({ fileName: 'testfile.pdf' }) // Payload with fileName
    };

    try {
        const response = await lambda.invoke(params).promise();
        console.log('Lambda Response:', JSON.parse(response.Payload));
    } catch (err) {
        console.error('Error invoking Lambda:', err);
    }
};

// Call the function
invokeLambda();
