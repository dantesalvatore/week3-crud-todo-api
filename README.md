# To-Do REST API

A lightweight RESTful API for managing tasks, categories, and completion statuses. Built to easily integrate to-do management into web, mobile, or CLI applications.

## Overview

- **Base URL:** `https://api.example.com/v1`
- **Protocol:** HTTPS
- **Response Format:** JSON

---

## Local Setup & Development

You can run the API locally using either **Docker** (recommended) or **Node.js**.

### Prerequisites

- [Git](https://git-scm.com/) installed

## Insall project dependencies
npm install

## Run database migrations
npm run db:migrate. 

## Start development server
npm run dev

## Endpoints 

GET,/todos,Retrieve all to-do items

POST,/todos,Create a new task

GET,/todos/:id,Fetch details of a single task

PATCH,/todos/:id,"Update task title, status, or due date"

DELETE,/todos/:id,Remove a task

## Error Codes

400,bad_request,"Missing required fields (e.g., title)"

401,unauthorized,Missing or invalid API key

404,not_found,Resource does not exist
