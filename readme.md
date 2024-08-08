Register User

Endpoint: /register Method: POST Description: Registers a new user. Request Body:

JSON { "fullName": "John Doe", "lastName": "Doe", "phone": "+1234567890", "email": "johndoe@example.com", "password": "password123" } Use code with caution. fullName (string, required): The full name of the user. lastName (string, required): The last name of the user. phone (string, required): The phone number of the user. email (string, required): The email address of the user. password (string, required): The password for the user account. Responses:

201 Created: User successfully registered.   400 Bad Request: Invalid request parameters. 500 Internal Server Error: Server error. Login

Endpoint: /login Method: POST Description: Logs in a user. Request Body:

JSON { "email": "johndoe@example.com", "password": "password123" } Use code with caution. email (string, required): The email address of the user. password (string, required): The password for the user account. Responses:

200 OK: User successfully logged in. Returns user details and authentication token.   401 Unauthorized: Invalid email or password. 500 Internal Server Error: Server error. Login with Google OAuth

Endpoint: /login/google Method: POST Description: Logs in or registers a user with Google OAuth. Request Body:

JSON { "idToken": "YOUR_GOOGLE_ID_TOKEN" } Use code with caution. idToken (string, required): The Google OAuth ID token. Responses:

200 OK: User successfully logged in or registered. Returns user details and authentication token. 401 Unauthorized: Invalid token or user registration failed. 500 Internal Server Error: Server error. Music

Get Music Information

Endpoint: /music Method: POST Description: Retrieves information about a music track. Request Body:

JSON { "title": "Bohemian Rhapsody", "singer": "Queen" } Use code with caution. title (string, required): The title of the music track. singer (string, required): The name of the singer. Responses:

200 OK: Returns information about the music track. 400 Bad Request: Invalid request parameters. 500 Internal Server Error: Server error. Subscription

Create Transaction

Endpoint: /subs Method: GET Description: Creates a new transaction. Request Parameters:

No request parameters required. Responses:

200 OK: Transaction created successfully. 400 Bad Request: Invalid request parameters. 500 Internal Server Error: Server error. Update Transaction Status

Endpoint: /subs/update Method: PATCH Description: Updates the status of a transaction. Request Body:

JSON { "transactionId": "12345", "status": "completed" } Use code with caution. transactionId (string, required): The ID of the transaction to update. status (string, required): The new status of the transaction. Responses:

200 OK: Transaction status updated successfully. 400 Bad Request: Invalid request parameters. 500 Internal Server Error: Server error. Error Handling

All endpoints use the errorHandler middleware to handle any errors that occur during processing. Ensure that your error responses are consistent with the expected format.