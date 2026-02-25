# DevLocker v1 🔐

API REST para guardar fragmentos de código (snippets) de forma privada.

## Requisitos

- Node.js 18+
- MongoDB corriendo en `localhost:27017`

## Instalación

```bash
npm install
```

## Configuración

Edita el archivo `.env` con tus valores:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/devlocker
JWT_SECRET=tuClaveSecreta
JWT_EXPIRES_IN=7d
```

## Ejecución

```bash
npm run dev
```

## Endpoints

### Auth

| Método | Endpoint               | Descripción       |
| ------ | ---------------------- | ----------------- |
| POST   | `/api/v1/auth/registro` | Registrar usuario |
| POST   | `/api/v1/auth/login`    | Login             |

### Snippets (requieren token JWT)

| Método | Endpoint                 | Descripción                      |
| ------ | ------------------------ | -------------------------------- |
| POST   | `/api/v1/snippets`       | Crear snippet                    |
| GET    | `/api/v1/snippets`       | Listar snippets del usuario      |
| PUT    | `/api/v1/snippets/:id`   | Editar snippet (solo dueño)      |
| DELETE | `/api/v1/snippets/:id`   | Borrar snippet (solo dueño)      |

### Ejemplo de headers

```
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

## Prueba de Fuego (QA)

1. Registrar **User A** y **User B**
2. Crear un snippet con el token de **User A**
3. Intentar borrar ese snippet con el token de **User B**
4. **Resultado esperado:** Error 404 — acceso denegado
