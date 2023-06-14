const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/EnrollmentController.js')

//tags seen below in swagger are used to give heading to group of apis.

/**
 * @swagger
 * tags:
 *   - name: Enrollment APIs
 *     description: "API to register and login user into the system"
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 */

/**
 * @swagger
 * /enrollment/loginUser:
 *   post:
 *    summary: API to login user.
 *    tags:
 *      - Enrollment APIs
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Admin has been successfully enrolled
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/loginUser', enrollmentController.loginUser)

/**
 * @swagger
 * /enrollment/registerUser:
 *   post:
 *    tags:
 *      - Enrollment APIs
 *    summary: API to register user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *    responses:
 *      200:
 *        description: User has been successfully register and enrolled.
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/registerUser', enrollmentController.registerUser)

module.exports = router
