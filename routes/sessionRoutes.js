const express = require('express');
const router  = express.Router()  ;
const sessionsController = require('../controllers/sessionsController');

// http://localhost:3000/sessions/
router.get(   '/new',    sessionsController.newSession)   ;
router.post(  '/login',  sessionsController.createSession);
router.delete('/logout', sessionsController.endSession)   ;

module.exports = router;
















/**
 * 
 * Simon Peter        - Simon Peter
 * Andrew             - Andrew
 * James Zebedeeson   - James
 * John               - John
 * Phillip            - Phillip
 * Bartho             - Batho
 * Thomas             - Thomas
 * Matthew            - Matthew
 * James Alphaeus     - James Alphaeus son
 * Lebbaeus Thaddaeus - Judas (James son)
 * Simon Canaanite    - Simon Zealot
 * Judas Iscariot     - Judas Iscariot
 * 
 */