# Working with Git

Git is the version control tool that we use that allows us to all work on the same project with minimal conflicts. Below are instructions for our programme participants on how to use git in the command line; you can also use git through the Source Control interface column in VS code.

To learn more about Git, go [here](https://git-scm.com/).

## Our main branches

We have two main branches in this repo: `master` and `develop`.

`master` is the copy of the live production site and `develop` is our working branch, which should be the most current and up to date with unreleased changes. We shouldn't ever be working off the `master` branch, as all work should be funnelled to this through the `develop` branch. `develop` is our default branch, and what we work off. when you clone the repo, make sure you are on the `develop` branch to begin. All new feature and bugfix branches should be made off the `develop` branch.

## Navigating branches

You can check what branch you are on and what branches you have copies of on your local, by typing into the terminal:

`git branch`

This will show you a list of your local active branches and highlight which one you are on.

To move to another branch, type in:

`git checkout [branch-name]`

When creating a new branch, make sure you always starting from the `develop` branch.

## Fetching and pulling changes

Before you can create a new branch or if you want to navigate to someone else's branch that you don't have a copy of, you need to pull the changes. By 'pulling', you are pulling any new changes from the repo to your local copy. You will need to pull to see any updates to `develop` or if anyone has made any changes to your own branch. You will also need to pull to make sure all your changes are up to date before doing a push if the branch you are working on has been changed by someone else, or if you need to update a branch to want to merge with yours.

You can see if there are any changes that need to be pulled by doing a fetch. In the terminal, type in:

`git fetch`

If there are changes you need to pull, you need to type in:

`git pull`

These commands will only apply for the branch you are on. If you are wanting to fetch or pull for another branch, you will need to checkout that branch first.

## Feature branches vs Bug fix branches & branch naming

Work on the project is broken up into two different types: features and bugs. A feature is defined by adding a new feature, as in adding new code, and a bug is fixing something in existing code. To differentiate between the two different types of work, we will had a prefix to our branches. All feature branches will start with `f/` and all bug fix branches will start with `b/`.

All branches need to be named with a short summary of the work. For example, if adding a feature to add a nickname, the branch could be called `f/add-nickname`, or if fixing a bug on a form field validation the branch could be called `b/form-field-validation`. This branch naming allows everyone to see if the code is to fix or add and what the code does.

## Creating a new branch

When picking up a card from the Trello board, all work relating to that card must be on it's own seperate branch. If you work on three cards in one sitting, then your work must be on three seperate branches with three seperate pull requests. This allows us to keep the repo and branches organised and make sure that the work is going into the repo in the correct order.

To create a new branch, make sure you have navigated to the `develop` branch and have done a pull to update the branch.

Following the naming guidelines above, type into the terminal:

`git checkout -b [branch-suffix/branch-name]`

This will create a new branch on your computer. This branch and all the work you do on this branch will not to visible to anyone else until you have pushed. It is good to do a push immediately so your new branch is visible from the repo. To do this, type into the terminal:

`git push`

As this is the first time you are doing a push, you will need to set the remote as upstream. It will tell you the command you need to use, to copy and paste into the terminal:

`git push --set-upstream origin [branch-suffix/branch-name]`

This now means your branch is now visible to the main repo and everyone else; it creates an 'origin' branch of your branch.

## Add and commit

When you have made changes and you save, you are saving it on your local machine and on your local branch. To create a pull request to add it to the `develop` branch or make the changes available for someone else to view, you need to add and then commit them. It is good practice to add and commit often, as a way to back up your work and also allows anyone to pick up your work if you're unable to finish it.

To do this, you need to first add your work. To check what can be added, you can check your git status by typing in the terminal:

`git status`

This will tell you what existing files have been changed by you and what new files have been created by you that have not yet been committed to the origin branch. This will also tell you what files you have added that have not been committed.

To add files, you can add all files at once by typing in the terminal:

`git add .`

You can also add selected files by copying and pasting them in the command. You can add multiple selected files by pasting them in with a space between them. In the terminal, type:

`git add [filename]`

For example, the command to add only this file would be: `git add docs/working-with-git.md`

Once the files have been adding, you need to commit. All commits should have a message, which is a short description of what was done. By adding and committing often, you can keep these messages short. To commit, type into the terminal:

`git commit -m '[what changes were made]'`

For example, the commit message for this file could be: `git commit -m 'fix spelling mistake'`

## Pushing your changes

You need to push your branch for your changes to be seen on the origin branch so you can make a pull request or so someone else can view them on your branch.

To push your changes, type into the terminal:

`git push`

If you have been working on this one branch for a long time, you might want to update it with the latest from the `develop` branch before pushing. You can do this by navigating back to the `develop` branch, pulling the changes, navigating back to this branch, and then doing a `git merge develop`. This will merge the latest updates from develop with your branch, so if there are any conflicts you can resolve them here before doing a pull request.

## Making a Pull Request

When you have finished the work on your branch and you want to merge your changes into the `develop` branch, you need to create a pull request for a mentor to review and approve. This is a safety step to ensure there is more code accountability and that the changes added are in line with the existing code base. This is where you can get direction on a better way to write something, introduced to a new design pattern, or an opportunity to explain what you've tried and why you've chosen to do it the way you have. All contributors, including mentors, need to create a pull request to have their code reviewed and approved before it can be merged.

When you have done a push, there will be a link to 'Create a pull request for [branch-suffix/branch-name] on GitHub by visiting: [url]'. You can `ctrl` + click on this link and it will take you to the pull request for this. Or there will just be a link to the GitHub repo and by clicking through to this you will see a button to create a pull request for this branch.

The pull request should show that you are wanting to merge your branch to `base: develop` and let you know if this is able to be merged.

In the text fields, it will have your latest commit message in the title but you can change this so it's a better summary of the Trello card or the work you have done, or you can just put in the branch name. In the comment field, you can put a more indepth comment of what you've done. For example, if I was created a pull request for changes to this file I could put:

Title: `Updating GIT documentation`
Comment: `Added new section for making a PR, fixed spelling mistakes.`

A pull request will also let you see what changes you have made to the file, with additions and deletions, as well as if there are any conflicts. You might get a conflict if someone else has changed something on the same line as you but has merged theirs into `develop` before you. To help prevent this, it's good practice to update your local version of the `develop` branch and merge it with your working branch before you do a push and create the pull request. If you still have conflicts on a pull request, it is ok and they are fixable.

When you are happy with what code you are submitting for a pull request, then click on `Create pull request`. It will now show up in the GitHub repo under 'Pull requests' and mentors will be notified that it's there waiting to be approved.


@TODO: merging. merge conflicts. delete branch