# RFC Automation

  * Discussion: https://github.com/kalisjoshua/lean-rfc/pull/2
  * Replaces: none
  * Replaced by: none
  * Topics: process, information-presentation


## Summary
[Summary]: #summary

GitHub Pages allows for rendering the content of an RFC inside a customizable static web page. This allows for customizing the UI to view RFCs in a manner that scales well as the number of RFCs grows.


## Conventions
[Conventions]: #conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](http://tools.ietf.org/html/rfc2119).


## Motivation
[Motivation]: #motivation

Navigating a mature RFC repo in git can be very time consuming, so this solution seeks to address the way in which users navigate the repo itself. By abstracting away the repository and presenting the relevant information in a customizable manner, we can get around some of the biggest hurdles when it comes to finding relevant information in a large RFC repo.


## Design
[Design]: #design

See https://pages.github.com/ for specific implementation and details. This proposal is to use the GitHub pages functionality to present the contents of the RFC repo.


## Drawbacks
[Drawbacks]: #drawbacks

This recommendation involves setting up a certain amount of automation and testing around deploying the github page, and also requires work to customize the presentation of the static site. It does not change or break the underlying RFC information in the RFC repo, so adding this feature will not preclude anyone from navigating the RFC repo in git. So, the only reason not to do this would be if the team cannot spare the time to set up the deployment and customization of the static page.


## Alternatives
[Alternatives]: #alternatives

A custom application could be built to fetch the data from the github repo and present it how we want. However, this would be duplicating a large part of the functionality offered by GitHub Pages.


## Unresolved (questions)
[Unresolved]: #unresolved-questions

The exact customization parameters we want to use for the static site have not been determined. It has only been determined that it is fairly customizable.
