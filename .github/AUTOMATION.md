# RFC Automation

Using GitHub Actions workflows some automation is set up to reduce the cognitive overhead imposed on mere mortals.


## docs-generator

Upon successful merge of new content to the `main` branch the RFC viewer application (RFC Emcee) will be automatically build and published for GitHub Pages. This process is not complicated but having automation for it will ensure that it is done consistently; and takes it off the list of things that a human would need to do.


## rfc-validator

Reviewing RFCs can be a daunting task. This workflow will check the nitty-gritty formatting details that are somewhat subjective to begin with and automates it so that everyone is following the same set of formatting guidelines regardless of experience with writing RFCs.

There are first some standard Markdown rules applied then some custom rules for RFCs.
