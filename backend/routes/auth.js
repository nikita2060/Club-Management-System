// Make sure your profile route is using the auth middleware correctly
router.get('/profile', verifyJWT, getUserProfile);