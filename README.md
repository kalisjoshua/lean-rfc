# Lean RFC

A Request For Comments (RFC) process intended to provide a consistent and
controlled path for proposing new standards, or replacing an existing standards.

Lean RFC is a *minimal* framework for managing complex systems of consensus-
building as documents using markdown and GitHub. Each document should be self-
contained and well defined.

Some projects may detail additional criteria for when RFCs are required; those
criteria should be documented in projects implementing Lean RFC.

---

## Conventions
[Conventions]: #conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](http://tools.ietf.org/html/rfc2119).

---

## Table of contents

  * [Lean RFC]
  * [Conventions]
  * [Before creating an RFC]
  * [Development process]
  * [The role of the shepherd]
  * [Reviewing RFCs]
  * [Postponement]
  * [An accepted RFC]


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
the idea over informally through any communications methods. Lean RFC encourages
starting the RFC process early to propose changes and get feedback about the
interest in the idea.

Lastly, before submitting a new RFC, check that a similar idea hasn't already
previously reached [Postponement]. You may believe that: "the time is right"
now, or you have information that wasn't available when the original proposal
was made; try commenting on the existing pull request before opening a new RFC.


## Development process
[Development process]: #submission-process

In short, the end result of the Lean RFC process is a new markdown document.
In some cases the pull request introducing the new (active) RFC will obsolete an
extant RFC; if this is the case both (new and old) RFCs need to be updated to
properly link to each other.

  1. Fork the RFC repo and create a working branch for your proposal
      - Work SHOULD not be done on the `main` branch
  2. Create the proposal directory `rfc/0000-rfc-proposal`
      - The "0000" will be replaced by an RFC number once accepted; this MUST be
        changed in the pull request before it is merged
      - Where "rfc-proposal" is descriptive, simple and concise
      - The RFC content should be added to `RFC.md` in the proposal directory
      - Supporting documents (images, data, diagrams, etc.) MAY be added to the
        directory for easy linking in the RFC content
      - There is a bash script to help with creating a new RFC `$ . create-rfc`
  3. Commit changes to your development branch
      - Fill in the RFC. Put care into the details: RFCs that do not present
        convincing motivation, demonstrate understanding of the impact of the
        design, or are disingenuous about the drawbacks or alternatives tend to
        be poorly-received.
  4. Push your changes and open a pull request
      - An open pull request will be assigned a *shepherd* from the maintainers
        to help move the RFC through the process
  5. Work with collaborators on completeness and acceptance
      - Be open and prepared for questions and suggestions
      - Revise and resubmit as necessary
      - As often as possible all discussion of the RFC should be captured as
        comments on the pull request
  6. Once all feedback has been considered and no further changes are likely
      - An RFC will be **Accepted** and then MUST then be assigned a number
      - An RFC will be **Rejected** and MUST have clear reasons why described
        in the comments


## The role of the shepherd
[The role of the shepherd]: #the-role-of-the-shepherd

The role of the shepherd is to move the RFC through the process. This starts
with simply reading the RFC and providing initial feedback. The shepherd should
also solicit feedback from people who are likely to have strong opinions about
the subject. In general, the idea is to gather as much feedback as possible
before the point where a decision is actually made; and the decision should be
obvious from the RFC discussion thread.

On occasion, there may not be consensus and discussion has stalled. Lean RFC
suggests that projects document what strategy should be enacted in these cases;
some possible options are:

  1. Majority vote among a group of "voting members"
  2. Designated decision maker makes a judgement
  3. Default decision to not include controversial RFCs
  4. Tie-breaking shepherd vote


## Reviewing RFCs
[Reviewing RFCs]: #reviewing-rfcs

While the RFC pull request is open, meetings may occur with the author and/or
relevant stakeholders to discuss the topic more thoroughly. If these do occur
the outcomes should be posted back to the RFC pull request discussion thread.

A decision can be made at any time to accept or reject an RFC. When a decision
is made, the RFC pull request will either be merged (**Accepted**) or closed
(**Rejected**). In either case, if the reasoning is not clear from the
discussion thread an additional comment describing the rationale for the
decision should be posted for clarity.


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


## An accepted RFC
[An accepted RFC]: #an-accepted-rfc

After an RFC is **Accepted** it MAY or SHOULD then be adopted/implemented; the
priority and timing of when that happens is entirely outside the responsibility
of this process.

In general, once an RFC reaches **Accepted** status it should not be
*substantially* changed. Only very minor changes should be submitted as
amendments (pull requests). More *substantial* changes should be new RFCs, with
a note mentioning the original RFC and proper linking if replacing. Exactly what
counts as a "very minor change" is subjective and up to the discretion of the
project maintainers; these criteria - if they exist - should be documented
further in project specific documentation.


[Lean RFC]: https://github.com/kalisjoshua/lean-rfc
