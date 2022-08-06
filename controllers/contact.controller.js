//vamos hacer pura logica

const Contact = require ("../models/Contact.model")

exports.getAllContacts = async (req,res,next)=>{
    try{
        const contacts = await Contact.find()
        res.status(201).json({contacts})

    }
    catch(error){
        console.log("Hay problema")
    }
}

exports.createContact= async(req,res,)=>{
    /*const contact ={
        name:'Titino',
        lastName:'Meraz',
        emai:'titino@gmail.com',
        phone:"123456789",
        address:'en la esquin a la vuelta',
        image:'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png',
        company:'Umbrella'
    }*/
    try{
        console.log(req.body)
        const {name,lastName,email,phone,address,image,company} = req.body
        //Vamos a crar un contacto para guardarlo en mongoose
        const contact= await Contact.create({

            contactName:name,
            contactLastName:lastName,
            contactEmail:email,
            contactPhoneNumber:phone,
            contactAddress:address,
            contactImageUrl:image,
            contactCompany:company,


        })
        console.log(contact)
        res.status(201).json(contact)
    }
    catch(error){
        console.log(error)
    }
}

exports.getContactById = async (req,res)=>{
    try{
        const {id} = req.params
        const oneContact= await Contact.findById(id)
        res.status(302).json(oneContact)
    }
    catch(error){
        console.log(error)

    }
}

exports.editContact = async (req,res)=>{
    try{
        const {id} = req.params
        const {name,lastName,email,phone,address,image,company} = req.body
        console.log("si esta",id)
      
        const oneContact= await Contact.findByIdAndUpdate(id,{
            contactName:name,
            contactLastName:lastName,
            contactEmail:email,
            contactPhoneNumber:phone,
            contactAddress:address,
            contactImageUrl:image,
            contactCompany:company,

        },{new:true})

        res.status(302).json(oneContact)
    }
    catch(error){
        console.log(error)

    }
}
exports.deleteContact = async (req,res)=>{
    try{
        const {id} = req.params
        const deleteContact = await Contact.findByIdAndDelete(id)
        res.status(301).json({message:"Contact deleted successfully"})
    }
    catch(error){
        console.log(error)

    }
}






//module.exports={getAllContacts}