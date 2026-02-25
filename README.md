# DevLocker v1 🔐

API REST segura para almacenar y gestionar fragmentos de código (snippets) de forma privada.

## 📋 Requisitos Previos

- **Node.js** (v18 o superior)
- **Docker** y **Docker Compose** (recomendado para la base de datos)
- O una instancia de **MongoDB** local o en la nube (Atlas)

## 🚀 Instalación y Configuración

1. **Clonar el repositorio** 
   ```bash
   git clone <https://github.com/ToroDevelloper/DevLocker-v1.git>
   cd DevLocker-v1
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto (puedes copiar el ejemplo):
   ```bash
   PORT=3000
   # Si usas Docker (configuración por defecto en docker-compose.yml):
   MONGO_URI=mongodb://admin:secretpassword@localhost:27017/devlocker?authSource=admin
   # Clave secreta para firmar los tokens JWT
   JWT_SECRET=superSecretDevLockerKey2026
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

## 🗄️ Base de Datos con Docker

Para levantar una instancia de MongoDB lista para usar con este proyecto:

```bash
docker compose up -d
```
Esto iniciará un contenedor de MongoDB en el puerto `27017` con las credenciales configuradas en el `docker-compose.yml` y `.env`.

Para detener la base de datos:
```bash
docker compose down
```

## ▶️ Ejecución

**Modo desarrollo** (con recarga automática):
```bash
npm run dev
```

**Modo producción**:
```bash
npm start
```

El servidor estará corriendo en: `http://localhost:3000`

## 📡 Endpoints de la API

### Autenticación (`/api/v1/auth`)

| Método | Endpoint    | Descripción                                      | Body (JSON) |
| ------ | ----------- | ------------------------------------------------ | ----------- |
| POST   | `/registro` | Crea una nueva cuenta de usuario y devuelve token JWT | `{ "nombre": "...", "email": "...", "password": "..." }` |
| POST   | `/login`    | Inicia sesión y devuelve token JWT               | `{ "email": "...", "password": "..." }` |

### Snippets (`/api/v1/snippets`)
🔒 **Requiere Header `Authorization: Bearer <token_jwt>`**

| Método | Endpoint | Descripción | Body (JSON) |
| ------ | -------- | ----------- | ----------- |
| POST   | `/`      | Crear un nuevo snippet personal | `{ "titulo": "...", "codigo": "...", "lenguaje": "js", "etiquetas": ["web"] }` |
| GET    | `/`      | Listar todos mis snippets | - |
| PUT    | `/:id`   | Editar un snippet propio | `{ "titulo": "Nuevo título", ... }` |
| DELETE | `/:id`   | Eliminar un snippet propio | - |

## 🔥 Prueba de Seguridad (QA Challenge)

El sistema implementa un "Muro de Privacidad" que impide acceder a recursos ajenos.

Paso a paso para verificar:
1. Registrar **Usuario A** y obtener su Token.
2. Registrar **Usuario B** y obtener su Token.
3. Crear un snippet autenticado como **Usuario A**. Copiar el `_id` del snippet creado.
4. Intentar hacer `DELETE /api/v1/snippets/<id_del_snippet_de_A>` usando el Token del **Usuario B**.
5. **Resultado Esperado:** Error `404 Not Found` (mensaje: "Snippet no encontrado o acceso denegado"). El sistema protege el recurso.

## 🛠️ Tecnologías

- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT** (JSON Web Tokens)
- **Bcrypt.js** (Hashing de contraseñas)
- **Express Validator**
- **Docker**
