import { Octokit } from "@octokit/rest";
import { exit } from "process";

async function getRepositoryTopics() {
  const octokit = new Octokit({
    auth: process.env.PAT,
    userAgent: "v1.0.0",
  });

  try {
    const response = await octokit.rest.repos.getAllTopics({
      owner: process.env.OWNER!,
      repo: process.env.REPO!,
    });
    if (!response.data) exit;
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getRepositoryLang() {
  const octokit = new Octokit({
    auth: process.env.PAT,
    userAgent: "v1.0.0",
  });

  try {
    const response = await octokit.rest.repos.listLanguages({
      owner: process.env.OWNER!,
      repo: process.env.REPO!,
    });
    console.log(response.data);
    if (!response.data) exit;
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function setTopics(targetRepo: string, topics: string[] | undefined) {
  console.log(targetRepo, topics);
  if (!topics) exit;
  const octokit = new Octokit({
    auth: process.env.PAT,
    userAgent: "v1.0.0",
  });

  try {
    const response = await octokit.rest.repos.replaceAllTopics({
      owner: process.env.OWNER!,
      repo: targetRepo,
      names: topics!,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
async function setLang() {}

const topics: string[] | undefined = await getRepositoryTopics();
setTopics(process.env.TRTGET!, topics);
getRepositoryLang();
