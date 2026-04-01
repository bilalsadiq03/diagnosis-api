Smart Diagnosis API
===================

Overview
--------

The Smart Diagnosis API is a backend system that analyzes user-provided symptoms and returns possible medical conditions along with probability estimates and recommended next steps. The system integrates artificial intelligence to enhance response quality and uses a fallback mechanism to ensure reliability.

* * * * *

Features
--------

-   AI-powered diagnosis suggestions using Gemini API

-   Returns 2--3 possible conditions with probability percentages

-   Provides recommended next steps (tests or doctor consultation)

-   Stores diagnosis history in MongoDB

-   RESTful API design

-   Input validation and error handling

-   Fallback mechanism for AI failures

* * * * *

Tech Stack
----------

-   Node.js

-   Express.js

-   MongoDB (Mongoose)

-   Gemini API (Google Generative AI)

-   Zod (for validation)

* * * * *

Project Structure
-----------------

smart-diagnosis-api/\
│── controllers/\
│ └── diagnosisController.js\
│── models/\
│ └── Diagnosis.js\
│── routes/\
│ └── diagnosisRoutes.js\
│── services/\
│ └── aiService.js\
│── config/\
│ └── db.js\
│── app.js\
│── server.js\
│── .env

* * * * *

API Endpoints
-------------

### 1\. Diagnose Symptoms

**POST /api/diagnose**

Request:
```bash
{
"symptoms": "fever, cough, chest pain"
}
```

Response:
```bash
{
"success": true,
"data": [
    {
        "condition": "Flu",
        "probability": "60%",
        "next_steps": "Consult a general physician and get a flu test"
    }
]
}
```

* * * * *

### 2\. Get Diagnosis History

**GET /api/history**

Response:
```bash
{
"success": true,
"count": 5,
"data": [...]
}
```
* * * * *

AI Integration
--------------

The system uses the Gemini API to generate structured medical suggestions.

### Approach:

-   Prompt engineering is used to enforce strict JSON output format

-   Responses are cleaned and parsed to ensure valid JSON

-   Zod is used to validate the AI response structure

### Reliability Enhancements:

-   If the AI response fails or is invalid, a rule-based fallback system is triggered

-   This ensures the API always returns a meaningful response

* * * * *

Validation and Error Handling
-----------------------------

-   Input validation ensures symptoms are provided as a string

-   AI responses are validated using Zod

-   Proper HTTP status codes are returned

-   Errors are handled gracefully to prevent crashes

* * * * *

Testing Strategy
----------------

The API was tested using multiple scenarios:

-   Normal cases (common symptoms)

-   Edge cases (empty input, invalid data types)

-   AI failure scenarios (fallback validation)

-   Real-world medical cases

-   Security testing (malicious input handling)

* * * * *

Setup Instructions
------------------

1.  Clone the repository:
       ```bash
        git clone <https://github.com/bilalsadiq03/diagnosis-api.git>
       ```

3.  Install dependencies:
       ```bash
        npm install
       ```
5.  Create a .env file:
       ```bash 
        MONGO_URI=your_mongodb_connection_string
        GEMINI_API_KEY=your_gemini_api_key
        PORT=5000
       ```

6.  Run the server:
       ``` bash
       npm start
       ```

* * * * *

## API Documentation

Swagger UI is available at:
http://localhost:5000/api-docs

It provides interactive API testing and detailed request/response schemas.

* * * * *

Deployment
----------

The API is deployed on Render.

Live URL:\
[https://your-app.onrender.com](https://your-app.onrender.com/)

* * * * *

Future Improvements
-------------------

-   Add authentication (JWT)

-   Rate limiting for API protection

-   Swagger API documentation

-   Frontend dashboard integration

-   Improved medical dataset integration

* * * * *

Conclusion
----------

This project demonstrates a real-world backend system that integrates AI with traditional server-side logic. It focuses on reliability, scalability, and clean architecture while ensuring consistent and meaningful outputs.

* * * * *
