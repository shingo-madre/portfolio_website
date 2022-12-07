const express = require('express');
const router = express.Router();
const Portfolio = require('../model/model');
const Testimonial = require('../model/testimonials');
const multer = require('multer');
const nodemailer = require('nodemailer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/portfolio_uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage});

var transporter = nodemailer.createTransport({
    port: 465,
    service: 'gmail',
    auth: {
        user: "rakazein.akbar@gmail.com",
        pass: "onjiulthaonbyhug",
    },
    secure: true
});

router.post('/post',upload.single('image'), async (req, res) => {
    const data = new Portfolio({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        image: req.file.filename,
        year: req.body.year,
        role: req.body.role,
        link: req.body.link
    })

    try {
        const dataToSave = await data.save()
        res.status(200).json({success: true, data: dataToSave})
    } catch (error) {
        res.status(400).json({ success: false, message: error.message})
    }
    
});

router.post('/post-testimonial', upload.single('fileName'), async (req, res) => {
    
    const data = new Testimonial({
        name: req.body.name,
        profession: req.body.profession,
        message: req.body.message,
        fileName: req.file.filename,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json({ success: true, data: dataToSave});
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
});

router.get('/getAll', (req, res) => {
    try {
        Portfolio.find({}, function(err, portfolios) {
            var portfolioMap = {}

            portfolios.forEach(function(portfolio) {
                portfolioMap[portfolio.title] = portfolio
            })

            res.status(200).json(portfolioMap)
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/getOne/:_id', async (req, res) => {
    try {
        const data = await Portfolio.findById(req.params._id)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error});
    }
});

router.get('/list/:author', async (req, res) => {
    try {
        const data = await Portfolio.find({ author: req.params.author})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/update/:_id', upload.single("image"), async (req, res) => {
    try {
        const updatedData = new Portfolio({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            image: req.file.filename,
            year: req.body.year,
            role: req.body.role,
            link: req.body.link
        })

        const result = await Portfolio.findByIdAndUpdate(
            req.params._id, updatedData, { new: true }
            )
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const dataToBeDeleted = await Portfolio.findByIdAndDelete(req.params._id)
        res.status(200).send(`Data with title ${dataToBeDeleted.title} has been deleted`)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/send-mail', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailData = {
        from: email,
        to: 'rakazein.akbar@gmail.com',
        subject: subject,
        text: name + message,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).json({success: false, error: error});
        } else {
            res.send("Success")
        }
    })
})

router.get('/', (req, res) => {
    try {
       Testimonial.find({}, (err, testimonials) => {
            const testimonialMap = Object.values(testimonials);

            res.render('index', {
                testimonialMap
            });

        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/portfolio-details', (req, res) => {
    res.render('portfolio-details');
});


module.exports = router;