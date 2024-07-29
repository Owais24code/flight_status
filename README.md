# FlightStatus

FlightStatus is a web application that provides real-time updates on flight statuses. The project is built using Vite for the frontend with React, a Python Flask application for the backend, and a PostgreSQL database. The entire backend setup can be run using Docker Compose.

## Features

- Real-time flight status updates
- User-friendly interface built with React
- RESTful API backend built with Flask
- PostgreSQL database for data storage

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/Owais24code/flight-status.git
cd flight-status
```

## Backend Setup
# .env
```sh
   cd server
   ```
DATABASE_URL=postgresql://owais:owais123@db:5432/flights

```sh
docker-compose up --build
   ```


## Frontend Setup

```sh
cd client
pnpm install
pnpm dev    
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.


# note
* due to unavailability of the flight status API, the project is currently using a mock API
```sh

Ticket ID	Source	Destination
IGO5024-1	BOM	     DEL
IAD778-1	BOM	     DEL
IGO2286-1	BOM	     DEL
VTI754-1	BOM	     DEL
IGO2219-1	BOM	     DEL
IAD549-1	BOM	     DEL
IAD738-1	BOM	     DEL
IGO2332-1	BOM	     DEL
IGO5024-2	BOM	     DEL
IAD778-2	BOM	     DEL
IGO2286-2	BOM	     DEL
IGO272P-1	BOM	     DEL
VTI754-2	BOM	     DEL
IAD549-2	BOM	     DEL
IAD738-2	BOM	     DEL


