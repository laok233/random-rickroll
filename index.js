const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const percentage = core.getInput('percentage');
    var message;
    if(percentage > Math.floor(Math.random() * 100)){
        message = '![rickroll](https://user-images.githubusercontent.com/37572049/90699500-0cc3ec00-e2a1-11ea-8d13-989526e86b0e.gif)';
        console.log('never gonna give u up \nnever gonna let u down \nnever gonna run around and desert u \nnever gonna make u cry \nnever gonna say goodbye \nnever gonna tell a lie and hurt u');
        
    }else{
        console.log('Fine you win this time.');
        message = core.getInput('message');
        if(message == ''){
            return;
        }
    }

    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.issue == null) {
        core.setFailed('No issue found.');
        return;
    }
    const issue_number = context.payload.issue.number;

    const octokit = new github.getOctokit(github_token);
    const new_comment = octokit.issues.createComment({
        ...context.repo,
        issue_number: issue_number,
        body: message
      });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
