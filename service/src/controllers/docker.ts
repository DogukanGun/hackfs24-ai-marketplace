import { Request, Response, NextFunction } from "express"
import { getDockerImageSha } from "../utils/getDockerSHA"
import DockerContainer from "../data/dockerContainer";

export const registerDockerContainer = async (req: Request, res: Response, next: NextFunction) => {
    const dockerRes = await getDockerImageSha(req.body.repository, req.body.tag);
    // Create a new blog post object
    const docker = new DockerContainer({
        sha: dockerRes,
        repository: req.body.repository,
        tag: req.body.tag,
    });

    // Insert the article in our MongoDB database
    await docker.save();
    res.sendStatus(200)
}
