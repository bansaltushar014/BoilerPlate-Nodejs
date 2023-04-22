const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/EnrollmentController.js')

//tags seen below in swagger are used to give heading to group of apis.

/**
 * @swagger
 * tags:
 *   - name: Enrollment APIs
 *     description: "API to enroll admin and register user into the system"
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - adminId
 *         - orgName
 *       properties:
 *         adminId:
 *           type: string
 *           description: The id of admin user
 *         orgName:
 *           type: string
 *           description: The org name of the admin to enroll
 *     User:
 *       type: object
 *       required:
 *         - adminId
 *         - userId
 *         - orgName
 *       properties:
 *         adminId:
 *           type: string
 *           description: The id of the admin.
 *         userId:
 *           type: string
 *           description: The id of the user.
 *         orgName:
 *           type: string
 *           description: The name of the organization.
 */

/**
 * @swagger
 * /enrollment/enrollAdmin:
 *   post:
 *    summary: API to enroll admin user in blockchain system.
 *    tags:
 *      - Enrollment APIs
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: Admin has been successfully enrolled
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post('/enrollAdmin', enrollmentController.enrollAdmin)

/**
 * @swagger
 * /enrollment/registerUser:
 *   post:
 *    tags:
 *      - Enrollment APIs
 *    summary: API to register and enroll user in blockchain system.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
