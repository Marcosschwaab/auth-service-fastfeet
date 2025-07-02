
---

# 🚚 FastFeet - Auth Service

This is the **authentication microservice** for the FastFeet system, a fictional delivery company. It handles **JWT-based login**, **role-based access control (RBAC)** for `admin` and `deliveryman` users, and stores users in **DynamoDB**.

---

## 📦 Technologies Used

* **NestJS** (TypeScript)
* **DynamoDB** (via Docker Compose)
* **RabbitMQ** (infrastructure-ready)
* **JWT Authentication**
* **Docker Compose**
* **AWS SDK v3**
* **Bcrypt** for password hashing

---

## ⚙️ Requirements

* Docker and Docker Compose
* Node.js and npm
* AWS CLI (for local table creation)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd auth-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
JWT_SECRET=supersecret
DYNAMODB_REGION=us-east-1
DYNAMODB_ENDPOINT=http://localhost:8000
```

### 4. Start local services (DynamoDB and RabbitMQ)

```bash
docker compose up -d
```

### 5. Create DynamoDB table

```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=cpf,AttributeType=S \
  --key-schema AttributeName=cpf,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --endpoint-url http://localhost:8000 \
  --region us-east-1
```

### 6. Start the service

```bash
npm run start:dev
```

---

## 📮 Available Endpoints

### 🔐 Login

```http
POST /auth/login
```

#### Request Body:

```json
{
  "cpf": "12345678900",
  "password": "password"
}
```

#### Response:

```json
{
  "access_token": "jwt_token"
}
```

---

### 👤 Create User (Admin Only)

```http
POST /users
Authorization: Bearer <access_token>
```

#### Body:

```json
{
  "cpf": "12345678900",
  "password": "password",
  "role": "admin"
}
```

---

### 🔍 Get User by CPF (Admin Only)

```http
GET /users/{cpf}
Authorization: Bearer <access_token>
```

---

### 🔑 Update Password (Admin Only)

```http
PUT /users/{cpf}/password
Authorization: Bearer <access_token>
```

#### Body:

```json
{
  "newPassword": "newpassword"
}
```

---

## 🔐 Access Rules (RBAC)

* Only users with role `admin` can:

  * Create users
  * View user details
  * Change passwords

* Login requires valid CPF and password.

* Protected routes require a valid JWT token with the appropriate role.

---

---

