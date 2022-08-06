const router = require("express").Router()
const {getAllContacts, createContact,getContactById,editContact,deleteContact} = require("../controllers/contact.controller")


           //path
router.get("/get-all-contacts",getAllContacts)
router.post("/create-contact",createContact)
router.get("/:id",getContactById)
router.patch("/edit/:id",editContact)
router.delete("/delete/:id",deleteContact)

module.exports = router
