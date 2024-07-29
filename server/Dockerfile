# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables to prevent Python from writing pyc files to disk and buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app/

# Expose the port that the Flask app runs on
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=src/main.py

# Run flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
