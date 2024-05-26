import axios from "axios";

// Function to get Docker image SHA
export const getDockerImageSha = async(repository: string, tag: string): Promise<string> => {
    const url = `https://hub.docker.com/v2/repositories/${repository}/tags/${tag}/`;
    try {
        const response = await axios.get(url);
        const digest = response.data.images.find((image: any) => image.architecture === 'amd64')?.digest;
        if (digest) {
            return digest;
        } else {
            throw new Error('Digest not found for the specified architecture.');
        }
    } catch (error) {
        throw new Error(`Failed to fetch Docker image SHA: ${error}`);
    }
}