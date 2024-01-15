const { Signup, Login, Project,SelectedProject  } = require('../Controllers/AuthController')
const router = require('express').Router()
const {userVerification}=require('../Middlewares/AuthMiddleware')

router.post('/signup', Signup)
router.get('/project', Project)
router.post('/selectedproject',SelectedProject)
router.post('/login/:userId', Login)
router.post('/',userVerification)

module.exports = router
