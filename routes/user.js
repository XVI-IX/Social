const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile
} = require("../controllers/user");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - phone_number
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the user
 *        username:
 *          type: string
 *          description: username provided by the user
 *        first_name:
 *          type: string
 *          description: User's first name
 *        last_name:
 *          type: string
 *          description: User's last name
 *        other_name:
 *          type: string
 *          description: User's other name
 *        email:
 *          type: string
 *          description: user's email address
 *        password:
 *          type: string
 *          description: user's password. This will be hashed before being saved.
 *        profile_img_url:
 *          type: string
 *          description: URL to user's profile image
 *      example:
 *          username: nabardd,
 *          first_name: David-Daniel,
 *          last_name: Ojebiyi,
 *          other_name: Oluwaponmile,
 *          email: oladoja14@gmail.com,
 *          password: VictoryMonkey0*,
 *          phone_number: +234901234567
 */

/**
 * @swagger
 * tags:
 *  name: Social
 *  description: The Social API
 * /profile:
 *  get:
 *    summary: Get user's profile.
 *    tags: [User]
 *    responses:
 *      200:
 *        description: the retrieved user data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *  put:
 *    summary: Update user's profile
 *    tags: [User]
 */
router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

module.exports = router;