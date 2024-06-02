import { exec } from 'child_process';
import fs from 'fs';

const executeLilypad = (message: string): string | any=> {
    // Prepare the command with the environment variable set
    const command = `export WEB3_PRIVATE_KEY=${process.env.PRIVATE_KEY} && lilypad run cowsay:v0.0.3 -i Message="${message}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return "error"
        }

        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        // Extract file path from the command output
        const match = stdout.match(/\/tmp\/lilypad\/data\/downloaded-files\/[\w]+\/stdout/);
        if (!match || match.length === 0) {
            return "error"
        }

        const resultFilePath = match[0];

        // Check if the file exists before reading
        if (!fs.existsSync(resultFilePath)) {
            return "error"
        }

        // Read the result file
        fs.readFile(resultFilePath, 'utf8', (readErr, data) => {
            if (readErr) {
                console.error(`readFile error: ${readErr}`);
                return "error"
            }

            // Send the file content and logs as response
            `Result File Content:\n${data}\n\nstdout:\n${stdout}`;
        });
    });
}

export default executeLilypad;