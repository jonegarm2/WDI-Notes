<img src="http://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png" width="900">

# Welcome to General Assembly - Los Angeles!

## Welcome WDI-DTLA 57

This will be your shared class repo! Guides, in-class labs and code samples, and other resources will live here. **ALL** official resources for this class will live in this repository.

### Contents

- Class Repository Structure
- WDI GitHub Workflow
- Contact Information
- Course Information and Dates
- Immersive Graduation Requirements

### Repo Structure

```
/wdi-dt-57
    /resources
    /projects
    /work
      /w01
          /d01
            /00_morning_exercise
            /01_topic
            /02_topic
            /03_topic
            /04_topic
            /ah   --or--  05_topic
```

### Becoming Familiar With the WDI GitHub Workflow

#### Forking (copying) the GA Class Repo to Your GitHub Account

You will have read-only access to the GA class repo.  However, you most certainly will want to be able to make changes (e.g., add notes, save code exercises, etc).  These changes will be saved to your own personal copy of GA's Student repo - known as a **fork**. To get this fork do the following:

1. Make sure that you're logged in to your GitHub account.
2. In another tab, browse to the GA class repo:  [https://github.com/ga-students/wdi-dt-57](https://github.com/ga-students/wdi-dt-57)
3. In the top-right corner of the page, click the `Fork` button.

Now you will have a copy of the repo in *your* GitHub account!

#### Cloning Your Copy of the Repository Locally

Now that you have a copy of the class repo in your GitHub account, it's time to bring the contents of that repo onto your computer - this process is known as **cloning**:

1. On your GitHub account, browse to your fork of the GitHub class repo and under the repository name click `Clone or download`
2. In the `Clone with HTTPS` section, click the clipboard to copy the URL for the repository.
3. Open Terminal and navigate to the `~/code` folder - you may choose a different folder if you wish, however our instructions in class will assume you clone the repo into a folder named `code`.
4. In Terminal, type `git clone ` and paste in the URL on the clipboard. The command should now look something like this:

```
$ git clone https://github.com/YOUR-GITHUB-USERNAME-HERE/wdi-dt-57
```

You can now `$ cd wdi-dt-57` and check out your local copy of your fork of the GA class repo!

#### Adding a git remote for the original GA class repo

Repos on your computer are called **local repos**.

Repos on GitHub are called **remote** repos.

When you cloned your fork of the repo, a git **remote** was automatically created. You can always check which remotes you have with this command:

```
$ git remote -v
```

Note that by convention, the remote that points to the GitHub repo it was cloned from is called **origin**.

In order to get the updates that the instructors push to the GA class repo, you will need to create another **remote** that points to GA's class repo that you forked:

```
$ git remote add upstream https://github.com/ga-students/wdi-dt-57
```

Note that by convention, the remote that points to the *original* GitHub repo that was forked is named **upstream**.

#### Getting Changes Pushed by Your Instructors

Each day (maybe several times a day), instructional materials will be pushed to the class repo by your instructors. You will want to "pull" these materials into your local repo.

First, if you've made any changes within the repo locally, you will need to **commit** those changes first:

```
$ git add -A
$ git commit -m "Add amazing work"
```

Now you can fetch the updates from the Github Student repo and merge them into your **local** repo (on your computer):

```
$ git pull upstream master
```

When you want to save commits you have locally to your forked GitHub class repo (in the cloud):

```
$ git push origin master
```

Here is a picture of this Git/GitHub workflow:

<img src="https://i.imgur.com/w871ATo.png">

#### Handling Merge Conflicts

A **merge conflict** occurs when the same line of code in your local repo is different than code in your remote repo. This confuses GitHub and therefore you must manually fix merge conflicts before pulling your remote into your local. GitHub will tell you that a merge conflict exists and will *annotate* your code to show you how your local code differs from your remote code. An example of such annotation is below.

```
<<<<<<< HEAD
// Local code is here 
=======
// Changes you are pulling go here
>>>>>>> 75c37cea922afc56e7d686adba063b986013ca9f
```

Once you have resolved these merge conflicts you can `add` and `commit` normally.

#### Important

**"Nested" repos are never permitted**.  Therefore, if you have important code, such as your projects, that belongs in its own repo, **be sure to put that code in folders outside of the class repo**.

### Instructional Team

|Role        | Name            | Slack       | Email |
|:--         | :--             | :--         | :-- |
|Instructor  | Jim Clark       | @jim.clark  | jim.clark@ga.co |
|Instructor  | Jonathan Tamsut       | @jontam | jonathan.tamsut@generalassemb.ly |

### Course Information

- Course duration: Monday, March 12th, 2018 - Monday, June 4th, 2018 (12 weeks, plus one extra day due to Memorial Day holiday)
- Class days & time: Monday - Friday 9:00am-5:00pm (not including after hours)
- Holidays:
	- Monday, May 28, 2018 (Memorial Day)
- Please note that after WDI, there will be 4 or 5 days of additional Outcomes workshops where your career coach will help you prepare for your job search, etc.

### GA Immersive Graduation Requirements

General Assembly's courses are pass/fail programs. We have certain requirements in order to be considered a graduate of the WDI program:

- No more than 3 days absent from class over the duration of the course
- Successful completion of four assigned projects 
- Participating in GA’s mid-course and end-of-course feedback surveys

When you complete our program with passing status, you unlock our alumni perks:

- Support from the Outcomes Team, including participation in the Meet & Greet event (with prospective employers).
- Receive a GA Letter of Completion (via email 1 week after graduation)
- $250 credit towards GA’s Classes & Workshop for 1 year from your start date (enter code: laimmersives1 at checkout). Please note once you are enrolled, cancellations are not permitted so please make sure you are able to attend the class or workshop prior to applying your code
- 30% off Classes and Workshops after your $250 has expired (enter code: back2school-la at checkout)
- Access to our Alumni Community:
  - Check out some awesome discounts on our [Alumni Perks Page](https://generalassemb.ly/alumni/perks)
  - Join our [GA LA Alumni Facebook](https://www.facebook.com/groups/GALAalumni/) channel for networking and job opportunities
  - Look out for a Monthly Alumni Newsletter sent to your email about upcoming alumni only events in LA
- *Interested in being on our alumni committee to plan upcoming networking and social events for GA alumni? Email [studentservicesla@generalassemb.ly](studentservicesla@generalassemb.ly)*

Welcome!
