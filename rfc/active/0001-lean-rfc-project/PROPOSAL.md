# Lean RFC Project

  - Status: proposal
  - Type: new project
  - Start Date: 2017-02-16
  - Discussion: (fill me in with link to RFC discussion - shepherd will
    complete this)
  - Supersedes: none
  - Superseded by: none


## Summary
[Summary]: #summary

[Lean RFC] is an open, collaborative, and evolving example of a standardized
process for handling RFCs; keeping in mind the core tenets of: simplicity,
thoroughness, and transparency. Lean RFC can be adopted by projects of any size
which wish to have a formal and consistent process for managing change without
the burden of defining a custom process for the project.


## Conventions
[Conventions]: #conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](http://tools.ietf.org/html/rfc2119).


## Motivation
[Motivations]: #motivations

Some project teams might want to *adopt* a process for RFCs rather than to
focus development effort on defining a custom process for their project. Other
project teams might want to adopt a generic process similar to other projects
they have worked on so that getting into a process is more familiar and more
familiar for outside contributors with experience with a common process; rather
than forcing new contributors to - on top of learning a new project structure -
also learn a new process for contributing.


## Design
[Design]: #design

Lean RFC consists of three parts:

  1. The Lean RFC documentation
    + e.g. [PROCESS.md](rfc/PROCESS.md)
    + This file documents the process for following Lean RFC.
  2. An RFC sample template
    + e.g. [0000-proposal-template.md](0000-proposal-template.md)
    + This file provides an easy to fill-out consistent format for all RFCs.
  3. A directory containing "active" RFCs
    + e.g. [`active`](rfc/active/)
    + RFCs within this directory should follow one of:
      [Simple Proposal Document], or [Proposal Directory]; a project should
      choose one and all RFCs should follow that pattern for all RFCs.

Each of these three things can be: included in the root of a project, nested in
a `/rfc` directory, in another repository, or any other organizational
structure that fits with the project goals.


### Simple Proposal Document
[Simple Proposal Document]: #simple-proposal-document

A *simple* proposal document is a markdown file - named as indicated in the
[submission process] section of the [Lean RFC] documentation - in the "RFCs"
folder containing all detail necessary. No other files needed or included.


### Proposal Directory
[Proposal Directory]: #proposal-directory

A proposal directory - named as indicated in the [submission process] section
of the [Lean RFC] documentation - includes a `proposal.md` file with the bulk
of the proposal but the directory allows for support documentation; whatever
that might be: images, data, audio, video, etc. These supporting files should
help to make the case or provide context for discussion and are external to the
proposal document to keep the proposal a readable as possible.


### Attribution
[Attribution]: #attribution

Much of Lean RFC was inspired by the [Rust-lang RFC repository], so thank you
to the Rust community for your contribution.


## Drawbacks
[Drawbacks]: #drawbacks

The only reason not to start a project like Lean RFC would be because no
projects will adopt it or gain any benefit from it. As long as at least one
person/project can gain benefit from it there was benefit in creating Lean RFC.


## Alternatives
[Alternatives]: #alternatives

  - [The Internet Standards Process][BCP-9] [RFC-2026][BCP-9] [BCP-9]
    + However, RFC-2026 might be too verbose for many projects that want
      something simpler to quickly adopt, implement, and follow.


## Unresolved (questions)
[Unresolved]: #unresolved-questions

<!--
What parts of the design are still to be done?
-->


[Lean RFC]: PROCESS.md
[submission process]: PROCESS.md#submission-process
[BCP-9]: https://datatracker.ietf.org/doc/rfc2026/
[Rust RFC repository]: https://github.com/rust-lang/rfcs
