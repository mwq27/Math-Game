# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Custom build of jquery being used ###

Steps to create the custom build of jquery that I'm using for this project:

* git clone git://github.com/jquery/jquery.git
* run __npm install__
* run grunt custom:-css,-deprecated,-dimensions,-effects,-event,-offset,-wrap,-core/ready,-exports/global,-exports/amd
    * This will build a jquery file excluding (-{module}) all of those modules.
* copy the jquery.min from the /dist/ directory into the the lcvip project, under /js/libs/

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact