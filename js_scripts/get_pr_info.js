import core from '@actions/core'
import { Octokit } from '@octokit/rest'

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.REPO;
    const prNumber = process.env.PR_NUMBER;

    const [owner, repoName] = repo.split('/');

    const octokit = new Octokit({ auth: token });

    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo: repoName,
    });

    const workflows = data.workflow_runs.filter(run => 
      run.pull_requests.some(pr => pr.number == prNumber)
    );

    console.log('Workflows for PR #' + prNumber + ':');
    workflows.forEach(workflow => {
      console.log(`- ${workflow.name} (Run ID: ${workflow.id})`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();