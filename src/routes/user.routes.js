import { Router } from "express";
import { loginuser, registerUser , logoutuser, refreshaccesstoken} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

    router.route("/login").post(loginuser)

    //seruce routes
    router.route("/logout").post(verifyJWT, logoutuser)
    router.route("/refreshtokrn").post(refreshaccesstoken)

export default router //can be imported by any name _eg RegisterUser