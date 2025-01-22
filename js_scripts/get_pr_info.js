import core from '@actions/core'
import { Octokit } from '@octokit/rest'

async function run(token, repo, prNumber) {
  try {
    /* */
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
    workflows.forEach(async workflow => {
      if (workflow.name == 'Sleep job') {
        if (workflow.status == "in_progress") {
          const out = `
          - ${workflow.name} (Run ID: ${workflow.id}) 
            Status: ${workflow.status} ${workflow.conclusion}
          `
          
          console.log(out.trim());
        }
      }
      

      // const workflowRuns = await octokit.rest.actions.listJobsForWorkflowRun({
      //   owner,
      //   repo: repoName,
      //   run_id: workflow.id
      // })

      
      // workflowRuns.data.jobs.forEach(async run => {
      //   const out = `- - ${run}`

      //   const steps = run.steps
      //   steps.forEach(async step => {
      //     console.log(step.conclusion)
      //   })

      //   console.log(out)
      // })
      
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}


const token = process.env.GITHUB_TOKEN;
const repo = process.env.REPO;
const prNumber = process.env.PR_NUMBER;

run(token, repo, prNumber)

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// (async () => {
//   for (let i=0; i < 60; i++) {
//       await run(token, repo, prNumber)
//       await sleep(5000)
//   }
// })()