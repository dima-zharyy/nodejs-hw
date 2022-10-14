const express = require('express');
const { auth: controller } = require('../../controllers');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

router.post('/signup', controller.signUp);

router.post('/signin', controller.signIn);

router.get('/signout', auth, controller.signOut);

router.get('/current', auth, controller.getCurrent);

router.patch('/', auth, controller.setSubscription);

router.patch('/avatars', auth, upload.single('avatar'), controller.setAvatar); // 'avatar' - field name in request body

router.get('/verify/:verificationToken', controller.verifyEmail);

router.post('/verify', controller.resendVerify);

module.exports = router;
