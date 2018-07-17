# Lean RFC
[Opening]: #lean-rfc

Many changes, including bug fixes and documentation improvements, can be
implemented and reviewed via the normal GitHub pull request workflow. Other
changes are more "substantial", and these changes should go through a review
and discussion process to arrive at a consensus and be sure that many opinions
are considered before ratification.

This "RFC" (request for comments) process is intended to provide a consistent
and controlled path for proposing: a new feature, or change to an existing
feature; so that all stakeholders can be confident about, and aware of, the
direction the project is evolving in.


## Table of Contents
[Table of Contents]: #table-of-contents

  - [Opening]
  - [Table of Contents]
  - [When to follow this process]
  - [Before creating an RFC]
  - [Submission process]
  - [The role of the shepherd]
  - [An active RFC]
  - [Reviewing RFCs]
  - [Implementing an RFC]
  - [Postponement]
  - [Help this is all too informal!]


## When to follow this process
[When to follow this process]: #when-to-follow-this-process

You need to follow this process if you intend to make *"substantial"* changes
to ***the project***, or the RFC process itself. What exactly constitutes a
"substantial" change is evolving based on community norms and varies depending
on what part of ***the project*** you are proposing to change, but may include
the following:

  - Any semantic or syntactic change that is not fixing a "bug"
  - Adding, changing, or removing existing features

Changes such as these do not require an RFC:

  - Rephrasing, reorganizing, refactoring, or otherwise "changing shape does
    not change meaning"
  - Additions that strictly improve objective, numerical quality criteria
    (warning removal, speedup, better platform coverage, more parallelism, trap
    more errors, etc.)
  - Additions only likely to be *noticed by* other developers, invisible to
    end users

If you submit a pull request to implement a new feature without going through
the RFC process, it may be closed with a polite request to submit an RFC first.


### Additional RFC criteria
[Additional RFC criteria]: #additional-rfc-criteria

Some projects may detail additional criteria for when RFCs are required; those
criteria should be documented in projects implementing Lean RFC.


## Before creating an RFC
[Before creating an RFC]: #before-creating-an-rfc

A hastily-proposed RFC can hurt its chances of acceptance. Low quality
proposals, proposals for previously-rejected features, or those that don't fit
into the near-term roadmap, may be quickly rejected which can be demotivating
for the unprepared contributor. Laying some groundwork ahead of the RFC can
make the process smoother.

Although there is no single way to prepare for submitting an RFC, it is
generally a good idea to pursue feedback from other project developers
beforehand, to ascertain that the RFC may be desirable; having a consistent
impact on the project requires concerted effort toward consensus-building.

The most common preparation for writing and submitting an RFC include talking
the idea over informally through any communications methods described in the
project documentation. Lean RFC encourages starting the RFC process early to
propose changes and get feedback about the interest in the idea.

Lastly, before submitting a new RFC, check that a similar idea hasn't already
previously reached [Postponement]. You may believe that: "the time is right"
now, or you have information that wasn't available when the original proposal
was made; try commenting on the existing pull request before opening a new RFC.


## Submission process
[Submission process]: #submission-process

In short, to get a major feature change request accepted, one must first get
the RFC merged into the repository as a markdown file. At that point the RFC is
"active" and may be implemented by a future pull request including an
implementation. The, more verbose, phases of the process are as follows:

  1. Fork the RFC repo; commit changes to your development branch.
  2. Copy `0000-template.md` to `active/0000-my-feature.md`
      + Where "my-feature" is descriptive
      + Don't assign an RFC number; leave "0000"
  3. Fill in the RFC. Put care into the details: RFCs that do not present
    convincing motivation, demonstrate understanding of the impact of the
    design, or are disingenuous about the drawbacks or alternatives tend to be
    poorly-received.
  4. Submit a pull request. As a pull request the RFC will receive design
    feedback from the larger community, and the author should be prepared to
    revise it in response.
  5. A maintainer will triage RFC pull requests by either: closing the pull
    request (for RFCs that clearly will not be accepted) with a description of
    why it is being closed, or assign it a *shepherd*. The shepherd is a
    trusted member of the project maintainers group who is familiar with the
    RFC process who will help to move the RFC forward and ensure that the right
    people see and review it.
  6. Build consensus and integrate feedback. RFCs that have broad support are
    much more likely to make progress than those that don't receive any
    comments. The shepherd assigned to your RFC should help you get feedback.
      + The shepherd *may* schedule meetings with the author and/or relevant
        stakeholders to discuss the issues in greater detail.
      + As often as possible all discussion about the RFC that is relevant to
        its progression should be documented in the pull request comment
        thread; including any offline discussions.
      + RFCs rarely go through this process unchanged, especially as
        alternatives and drawbacks are shown. You can make edits, big and
        small, to the RFC to clarify or change the design, but make changes as
        new commits to the pull request, and leave a comment on the pull
        request explaining your changes. Specifically, do not squash or rebase
        commits after they are visible on the pull request.
  7. After both proponents, and opponents have clarified, and defended their
    respective positions the conversation will settle and then the RFC will
    enter its *final comment period* (FCP). This is a final opportunity for the
    community to comment on the pull request. The FCP is a reminder for all
    members of the project maintainers group to be aware of the RFC.
      + The FCP, typically, lasts one week but may be extended if consensus
        cannot be reached.
  8. At the end of the FCP, the RFC will either be: accepted, by merging the
    pull request, then assigning the RFC a number (corresponding to the pull
    request number), at which point the RFC is "active", or rejected by closing
    the pull request.


### Writing an RFC

RFCs should be written in a manner that it will reflect the final design of the
RFC. However, given that the nature of the process means that the final
implementation of the RFC - at the time of the next release - cannot be known
when writing the RFC, modifications to "active" RFCs can be done in follow-up
pull requests but should be the exception and not the rule.


## The role of the shepherd
[The role of the shepherd]: #the-role-of-the-shepherd

During triage, every RFC will either be closed or assigned a shepherd. The role
of the shepherd is to move the RFC through the process. This starts with simply
reading the RFC in detail and providing initial feedback. The shepherd should
also solicit feedback from people who are likely to have strong opinions about
the RFC. When this feedback has been incorporated and the RFC seems to be in a
steady state, the shepherd will announce an FCP. In general, the idea here is
to "front-load" as much of the feedback as possible before the point where a
decision is actually made; by the end of the FCP, the decision on whether or
not to accept the RFC should be obvious from the RFC discussion thread.

On occasion, there may not be consensus but discussion has stalled. Lean RFC
suggests that projects document what strategy should be enacted in these cases;
some possible options are:

  1. Majority vote among a group of "voting members"
  2. Designated decision maker makes a judgement
  3. Default decision to not include controversial RFCs
  4. Tie-breaking shepherd vote


## An active RFC
[An active RFC]: #an-active-rfc

After an RFC becomes "active" authors may then implement it and submit the
feature as a pull request to the repository. Being "active" is not a guarantee
or "rubber-stamp" as to its immediate inclusion, and in particular still does
not mean the feature will ultimately be merged; it does mean that in principle
all the major stakeholders have agreed to the feature and are amenable to
merging it.

Furthermore, the fact that a given RFC has been accepted and is "active"
implies nothing about what priority is assigned to its implementation, nor does
it imply anything about whether developer has been assigned the task of
implementing the feature. While it is not *necessary* that the author of the
RFC also write the implementation, it is by far the most effective way to see
an RFC through to completion; RFC authors should not expect that other project
developers will take on responsibility for implementing the newly "active" RFC.

In general, once an RFC reaches "accepted" status it should not be
substantially changed. Only very minor changes should be submitted as
amendments (pull requests). More "substantial" changes should be new RFCs, with
a note mentioning the original RFC. Exactly what counts as a "very minor
change" is subjective and up to the discretion of the project maintainers
group; these criteria - if they exist - should be documented further in project
specific documentation.


## Reviewing RFCs
[Reviewing RFCs]: #reviewing-rfcs

While the RFC pull request is open, the shepherd may schedule meetings with the
author and/or relevant stakeholders to discuss the issues in greater detail. If
these types of discussions do occur the outcomes should be posted back to the
RFC pull request discussion thread.

Decisions can be made at any time. When a decision is made, the RFC pull
request will either be merged or closed. In either case, if the reasoning is
not clear from the discussion thread an additional comment describing the
rationale for the decision should be posted for clarity.


## Implementing an RFC
[Implementing an RFC]: #implementing-an-rfc

Some accepted RFCs represent vital features that need to be implemented right
away. Other accepted RFCs can represent features that can wait until some
developer "feels" like doing the work. Every accepted RFC should have an
associated issue tracking its implementation in the repository; thus that
associated issue can be assigned a priority via the triage process that the
project uses for all issues in the repository.

The author of an RFC is not obligated to implement an RFC. Of course, the RFC
author (like any other developer) is welcome to post an implementation for
review after the RFC has been accepted.

If you are interested in working on the implementation for an "active" RFC, but
cannot determine if someone else is already working on it, feel free to ask
(e.g. by leaving a comment on the associated issue).


## Postponement
[Postponement]: #rfc-postponement

Some RFC pull requests are tagged with the "postponed" label when they are
closed (as part of the rejection process). An RFC closed with "postponed" is
marked as such because evaluating the proposal or exploring implementation
details is premature and can afford to wait until some time in the future.

Usually a pull request marked as "postponed" has passed an informal first
evaluation of "would this ever be considered" with a response of "yes" or else
the pull request would be closed as "rejected"; with details as to why. A
"postponed" pull requests may be re-opened when "the time is right".


## Help this is all too informal!
[Help this is all too informal!]: #help-this-is-all-too-informal

The Lean RFC process is intended to be as lightweight as reasonable for the
present circumstances. As usual, we are trying to let the process be driven by
consensus and community norms, not impose more structure than necessary.


[Lean RFC]: https://github.com/kalisjoshua/lean-rfc
