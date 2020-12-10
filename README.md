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

1.  Download and install <a href="https://www.docker.com/get-started">docker</a>

2.  run the script `starter.sh`
    * open a terminal <br/>
    * use the command cd and go to the current directory [labely] <br/>
    * `./starter.sh` <br/>
    
    
## Usage

Labely is self explanatory and very simple to use. <br/>

### Classification Feature: 
Imagine you want to train a model that has to determine whether an email is a spam or not. If it is a spam, the label is `SPAM` and if not, the label is `HAM`. To train such a model, you need data. In particular, you need labeled data (i.e you need to tell the model whether an email is a spam or not). <br/>

Labely can help you `label` or tag those emails (or whatever files you have).<br/><br/>

1. Upload your `csv file` containing all your emails on each row. Ofcourse, your csv can have other columns as well. ```Any well formed comma-separated (CSV) file should work.```<br/>
```Tip: If you are unable to read your CSV, then it is probably too large. For now, labely only supports (more or less) about 1000 rows depending on the size (in bytes) of your CSV file. Hence, just chunk your files into smaller ones if you experience any issues.```<br/>
2. Enter your labels. In my case, I only have `SPAM` and `HAM`. You can have as many labels as you want.<br/>
3. Start labelling and download your data after you are done. (```The Discard button will delete any progress made.```)

### Text Annotation Feature: 
Text annotation is an important task in Natural Language Processing. Here is an example. Suppose you want to teach a computer how to detect names of cities in text.
So if you give sentence like <br/>```They live in Xeros the capital of Xarx```<br/>, (names i just invented :D), to a computer, it could predict that `Xeros` is a city. 

To train the computer to do this, we need to provide it with examples. This is where labely comes in handy. <br/>

1. Upload your `csv file` containing your text on each row. ```This column must have a column name called "text". A column name is just the value of the first line or row in the file.```<br/>
```All other columns are discarded since they are not used.``` <br/>
```Tip: If you are unable to read your CSV, then it is probably too large. For now, labely only supports (more or less) about 1000 rows depending on the size (in bytes) of your CSV file. Hence, just chunk your files into smaller ones or make sure you have a column name "text" if you experience any issues.```<br/>
```Make sure that ```<br/>
2. Enter your labels. In my case, I have `CITY`, `PRODUCT`, `PERSON`. You can have as many labels as you want.<br/>
3. Start labelling and download your data after you are done. (```The Discard button will delete any progress made.```)


