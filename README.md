## Challenge

[Adobe Challenge Series - Week 4/6] https://www.topcoder.com/challenges/77d8fcba-f169-4384-8e8e-3f9125908869

# Video Demo

https://www.dropbox.com/s/v5ctcvipt4ddvqj/demo.mov?dl=0

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## Adobe
### PDF Tools API

https://www.adobe.io/apis/documentcloud/dcsdk/pdf-tools.html


## Doployed Url

[Heruku](https://pdf-operations.herokuapp.com)

Because of cold start of dynos, refresh might be required intially.

# Theme

Figma wireframing

## Test User

    username: amit
    email: amit@example.com
    password: iLEjAOzlaa

Credentials and configurations are in .env

REACT_APP_HOST=https://localhost:3000
REACT_APP_BACKEND=https://pdf-operations-backend.herokuapp.com

## Operations
### Merge Operation

Uploading two documents and poerforming merge action by clicking merge button will merge them both and show a preview.

### Split Operation

If the splitting page number is 2, the first part will have that page and rest of the pages will go to the next part.
So, page number as input is taken after uploading the file.

### Delete Operation

Takes page number and deletes that page. If successful, the pdf will be show as preview.
