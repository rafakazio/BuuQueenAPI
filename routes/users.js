import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*router.get("/checkauthentication", verifyToken, (req, res, next) => { //whenever we make request for this endpoint its gonna go to verifytoken and if eveything is ok its gonna say next ans we are gonna come back here and apply this function
    res.send("Hello user, you are logged in :)")
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => { //whenever we make request for this endpoint its gonna go to verifytoken and if eveything is ok its gonna say next ans we are gonna come back here and apply this function
    res.send("Hello user, you are logged in and you can delete your account :)")
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => { //whenever we make request for this endpoint its gonna go to verifytoken and if eveything is ok its gonna say next ans we are gonna come back here and apply this function
    res.send("Hello user, you are logged in and you can delete all accounts :)")
});*/



//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getUsers);

export default router;