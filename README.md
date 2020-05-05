# labely

The goal of this project is to provide an easy to use open source tool for data labelling. To run this software, just follow the steps. Don't worry if you have never used `npm` before.

**Important Note**

Currently, the application works without (local) backend server, so it only supports files with limited sizes. We recommend labelling in batches, i.e If your CSV is too large, break it into smaller CSV files before working with labely. We also recommend having a max of 1000 rows, although it often works with more.

<br/>
<br/>
<br/>

**Attribution**: {JSON to CSV code snipet from `stackblitz.com`}

<br>

## Installation

### Option 1: npm setup

    1. Download and install npm from this site: https://www.npmjs.com/get-npm
    2. Clone this project
    3. In the root directory of the project, type: `cd labely-frontend` in your terminal
    4. Then enter the next command: `npm install`
    5. Followed by `ng serve`
    6. The go to your browser and enter the address: `http://localhost:4200/`
    7. Enter your labels (After entering each label press enter)
    8. Select your CSV file (For now labely only supports CSV file with commas seperation only)
    9. Have fun labelling
    10. Download your labelled data :D

    Here is a 40-second tutorial showing how to use the tool: https://youtu.be/_UYlyz6uthI

### Option 2: Docker

1.  Choose your version, download and install <a href="https://www.docker.com/get-started">docker</a>

2.  run the script starter.sh


    i.) open a terminal
    ii.) use the command cd and go to the current directory [labely]
    iii.) ./starter.sh
