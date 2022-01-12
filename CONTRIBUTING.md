# Contributing

In addition to this document, [GitHub Guides] has content on best practices for
[Contributing to Open Source].

The two levels of contributing are: Contributor, and Maintainer.

| Contributor | Maintainer |   |
| ----------- | ---------- | - |
| Yes         | Yes        | Follow the [Code of Conduct]
| Yes         | Yes        | Adhere to this document
| No          | Yes        | Take reparatory actions when [Code of Conduct infractions arise
| No          | Yes        | Respond to discussions on issues and pull requests in a [timely manner](#response-time)
| Yes         | Yes        | Freely release exclusive rights to all contributions of code, or other content, to this project


## Response Time

Maintainers should respond to all new comments, issues, and pull requests by
the next business day; even if that response is to say that it will be longer
before any meaningful feedback can be given. *Leniency during any holidays is
expected.*

It is important to offer transparency in what is happening with a proposed
change. Not all proposed changes will be accepted as not all changes will align
with the goal of the project.

If you propose changes and don't hear back after a day or two feel free to
comment again to hopefully ping the team again to remind them to respond.


## Changes

Changes to this project should follow [Lean RFC] guidelines.


### Commit Messages

Commit messages should follow the [commit message format] (included in the root
directory of this repository). You can set this template as the default text
for any commit messages by using the following command:

```bash
$ git config --add commit.template ./.github/commit.template
```

*This command will only set this template file as the default commit template
for this repository and will not affect any of your other repositories.*

Read more about [Git Commit Templating].


[commit message format]: commit.template
[Contributing to Open Source]: https://guides.github.com/activities/contributing-to-open-source/
[Contributor Covenant]: http://contributor-covenant.org
[Git Commit Templating]: https://git-scm.com/docs/git-commit#git-commit---templateltfilegt
[GitHub Guides]: https://guides.github.com/
[Lean RFC]: https://github.com/kalisjoshua/lean-rfc
