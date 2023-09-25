# Social

## Project Configuration

The project is divided into:

* **Controllers**: found in `controllers` folder. Coordinates the functionality of the routes in the backend service.

* **Middlewares**: found in `middlewares` folder. Contains logic for processing incoming request and performs tasks such as authentication.

* **Models**: found in `models` folder. Contains the schema representing the data to be used in the backend service.

* **Routes**: found in `routes` folder. Contains the routing logic for routes in the backend service.

* **Public**: Contains files that are stored temporarily in the backend service.

* **Errors**: found in the `errors` folder. Contains templates for error messages.

* **Utility Functions**: found in the `utils` folder. Contains functions that are used to process utilities in the backend service.

## Getting Started

### 🧰 Tech Stack

* Node.js

* Express

* MongoDB

### 📒 Requirements

This project requires nodeJS version >= 14 and its corresponding npm package manager.

### 💻 Running Locally

1. Clone this repository by running the command below in your terminal:

```bash
https://github.com/XVI-IX/social.git
```

2. Install the dependencies:

```bash
npm install
```

3. Using the .env_sample template, create a .env file and fill it with the environment variables.

4. start the server:

```bash
npm start
```


## 🚪 Endpoints

The **Social** app provides the following endpoints:

* **POST** `/api/signup`

* Endpoint to signup as a user on social.

* Arguments: Accepts data representative of new user.

```json
{
    "username":"nabardd",
    "first_name":"David-Daniel",
    "last_name":"Ojebiyi",
    "other_name":"Oluwaponmile",
    "email":"oladoja14@gmail.com",
    "password":"VictoryMonkey0*",
    "phone_number":"+2349036213522"
}
```

* `username` - the username the new user intends to use for their account. `Required`.

* `first_name`: the new user's first name. `Required`.

* `last_name`: the new user's last name. `Required`.

* `other_name`: the new user's other name.

* `email`: the new user's email address. `Required`.

* `password`: the new user's password. `Required`.

* `phone_number`: the new user's phone number. `Required`.

* Returns: JSON representing success or failure.

```json
{
    "message": "Signup successful",
    "success": true,
    "username": "nabardd",
    "status": 201
}
```

* Sample Request: ``

* **POST** `/api/login`

* Endpoint to login as a user.

* Arguments: Accepts login parameters.

``` json
{
    "email": "oladoja14@gmail.com",
    "password": "VictoryMonkey0*"
}
```

* `email`: The email address.

* `password`: The password.

* Returns: JSON Object containing information for login success.

```json
{
    "message": "Login successful",
    "status": 200,
    "success": true
}
```

* Sample Request: ``


* **POST** `/api/forgotPassword`

* Endpoint to send password reset token to users email address. This uses a queue to process requests to the email host.

* Arguments: accepts the users email address

```json
{
  "email": "oladoja14@gmail.com"
}
```

* Returns:

```json
{
    "message": "Reset token sent successfully",
    "success": true
}
```

* Sample request: ``

* **POST** `/api/resetPassword?token=TOKEN&id=ID`

* Endpoint to send new password to database.

* Arguments: this endpoint recieves arguments from the request body and query parameters. From the request body it recieves the new password and from the query parameters it receives the reset_token and user_id.

```json
{
    "message": "Password reset successful",
    "success": true
}
```

* Sample request: ``

* **GET** `/api/profile`

* Endpoint to get logged in user's profile. It gets the user's ID from the session.

* Arguments: Accepts no arguments from the user.

* Returns: JSON object containing the user's profile information.

```json
{
    "message": "User info query successful",
    "success": true,
    "data": {
        "_id": "651164c03f0d33c6973072f2",
        "username": "nabardd",
        "first_name": "David-Daniel",
        "last_name": "Ojebiyi",
        "other_name": "Oluwaponmile",
        "email": "oladoja14@gmail.com",
        "phone_number": "+2348187058736",
        "__v": 0
    }
}
```

* Sample Request: ``

* **PATCH** `/api/profile`

* Endpoint for authenticated user to edit profile.

* Arguments: Accepts fields to be edited as JSON object.

```json

```

* Returns:

* Sample Request: ``

* **POST** `/api/comment/:post_id`

* Endpoint for authenticated user to make a comment on a post.

* Arguments: Takes the user ID from the session and the post ID from the route parameters, and the content for the comment from the JSON body passed.

```JSON
{
    "content": "Hope this works"
}
```

* Returns: Response showing success or failure.

```json
{
    "message": "Comment successful",
    "success": true,
    "comment": {
        "post_id": "651171cf0ffbb5f0830ac106",
        "user_id": "651164c03f0d33c6973072f2",
        "content": "Hope this works",
        "likes": 0,
        "likedBy": [],
        "_id": "651174e42c52c52ba675c105",
        "createdAt": "2023-09-25T11:54:12.223Z",
        "updatedAt": "2023-09-25T11:54:12.223Z",
        "__v": 0
    }
}
```

* Sample request: ``

* **POST** `/api/comment/reply/:commentId`

* Endpoint that add a reply to a comment in the means of a comment to a comment.

* Arguments: Takes the user ID from the session and adds a reply (comment) to a comment using the comment ID

```json

```

* **DELETE** `api/comment/:commentId`

* Endpoint to delete a comment from database.

* Arguments: Takes the user ID from the session and the comment ID from the route and deletes the comment.

* Returns: JSON object showing success or failure.

```json
{
    "message": "Comment deleted",
    "success": true,
    "status": 200
}
```

* Sample request: ``