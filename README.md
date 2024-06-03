## Loan Amortization & Calculator
A full-stack application that creates customers, loan offers for customers and 
computes monthly payment based off the standard loan amortization formula.


#### API (Backend) Endpoints documentation
- http://localhost:8000/swagger/
- http://localhost:8000/redoc/


#### To run locally
###### Backend
Start the backend server:
```commandline
make setup
make runserver
```
Run backend tests:
```commandline
make runtest
```


###### Frontend
Start the frontend server:
```commandline
cd frontend
npm i
npm run dev
```
Run frontend tests:
```commandline
npm run test
```


#### Architecture
| Phase           | Technologies                           |
|:----------------|:---------------------------------------|
| Backend         | Django Rest Framework (Python, Django) |
| Database        | Sqlite3                                |
| Frontend        | Vite(React), TypeScript, Vanilla CSS   |
| Package Manager | NPM                                    |
| Version Control | git                                    |


