const express = require("express");
const mongoose = require("mongoose")

const User = require("./model/User")

const app = express()
const port = 3000
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Frontend"));

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"/Frontend")))

mongoose.connect("mongodb://127.0.0.1:27017/CustomerDB").then(()=>{
    console.log("Database Connected")
}).catch((e)=>{
    console.log(e)
    console.log("Database Can't Be Connected")
})

app.get("/", (req, res)=>{
   
    try {
        res.render("index");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

app.get("/appointment", (req, res)=>{
    try {
        res.render("appointment");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
app.get("/about", (req, res)=>{
   
    try {
        res.render("about");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})
app.get("/service", (req, res)=>{
 
    try {
        res.render("service");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
app.get("/gallery", (req, res)=>{
    try {
        res.render("gallery");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})
app.get("/blogss", (req, res)=>{
    try {
        res.render("blogs");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
app.get("/termscondition", (req, res)=>{
    try {
        res.render("termscondition");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  
})
app.get("/privacypolicy", (req, res)=>{

    try {
        res.render("privacypolicy");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
   

})
app.get("/blogss/AboutCommercialConstructionServices", (req, res)=>{
    try {
        res.render("blogs/About Commercial Construction Services");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})
app.get("/blogss/ShouldIHireAGeneralContractorOrASpecializedContractor", (req, res)=>{

    try {
        res.render("blogs/Should I Hire A General Contractor Or A Specialized Contractor");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})
app.get("/blogss/TheDifferenceBetweenAProfessionalHomeServiceContractorAndAHandyman", (req, res)=>{
    try {
        res.render("blogs/The Difference Between A Professional Home Service Contractor And A Handyman");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
   

})

app.get("/admin/login", (req, res)=>{
    try {
        res.render("admin/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
app.get("/admin/admins", async (req, res) => {
    try {
        // Fetch all user data from the MongoDB collection
        const users = await User.find({});

        // Render the admin.html file and pass the user data as a variable
        res.render("admin/admins", { users });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.post("/", async (req, res) => {
    try {
        const { Date: requestedDate } = req.body;

        // Check if there are already 10 appointments for the specified date
        const appointmentCount = await User.countDocuments({
            Date: requestedDate,
            // Add any additional conditions if needed
        });

        const appointmentLimit = 3;

        if (appointmentCount >= appointmentLimit) {
            // If the limit is reached for the specified date, respond with an error or a message
            res.render("error");
        }

        // If the limit is not reached, proceed to save the new appointment
        const appointmentData = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Mobile: req.body.Mobile,
            Date: requestedDate,
            Address: req.body.Address,
            Message: req.body.Message,
            // Add any additional fields as needed
        });

        await appointmentData.save();

        // Render the submit page or send a success message
        res.render("submit");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Add this route to handle the delete request
app.delete("/admin/deleteUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Use the User model to delete the user by ID
        await User.findByIdAndDelete(userId);

        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(port , ()=>{
    console.log("app running on "+port)
})