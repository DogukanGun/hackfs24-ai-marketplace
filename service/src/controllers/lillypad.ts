import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs from 'fs';

export const runLilyPadCowsay = async (req: Request, res: Response, next: NextFunction) => {
    const { message, privateKey } = req.body;

    if (!message) {
        return res.status(400).send('Message is required');
    }

    if (!privateKey) {
        return res.status(400).send('Private key is required');
    }

    // Prepare the command with the environment variable set
    const command = `export WEB3_PRIVATE_KEY=${privateKey} && lilypad run cowsay:v0.0.3 -i Message="${message}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }

        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        // Extract file path from the command output
        const match = stdout.match(/\/tmp\/lilypad\/data\/downloaded-files\/[\w]+\/stdout/);
        if (!match || match.length === 0) {
            return res.status(500).send(`Could not determine the file path from the command output\nstdout:\n${stdout}`);
        }

        const resultFilePath = match[0];

        // Check if the file exists before reading
        if (!fs.existsSync(resultFilePath)) {
            return res.status(500).send(`File not found: ${resultFilePath}\nstdout:\n${stdout}`);
        }

        // Read the result file
        fs.readFile(resultFilePath, 'utf8', (readErr, data) => {
            if (readErr) {
                console.error(`readFile error: ${readErr}`);
                return res.status(500).send(`Error reading result file: ${readErr.message}\nstdout:\n${stdout}`);
            }

            // Send the file content and logs as response
            res.status(200).send(`Result File Content:\n${data}\n\nstdout:\n${stdout}`);
        });
    });
};
