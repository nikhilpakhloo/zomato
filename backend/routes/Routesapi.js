import express, { request } from 'express';
import { FOODDETAILS } from '../model/FoodSchema.js';



import multer from 'multer';
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/', upload.single('foodimage'), async (request, response) => {
    try {
        if (
            !request.body.foodname ||
            !request.body.foodtype ||
            !request.file ||
            !request.body.foodprice
        ) {
            return response.status(400).send("Foodname, foodtype, and foodimage are required");
        }

        const newFooditem = {
            foodname: request.body.foodname,
            foodtype: request.body.foodtype,
            foodimage: request.file.path,
            foodprice: request.body.foodprice
        };

        const item = await FOODDETAILS.create(newFooditem);
        return response.status(201).send(item);
    } catch (error) {
        console.error(error);
        return response.status(500).send("Internal server error");
    }
});


router.get('/', async (request, response) => {
    try {
        const items = await FOODDETAILS.find({})

        const itemsWithImages = items.map((item) => {
            return {
                _id: item._id,
                foodname: item.foodname,
                foodtype: item.foodtype,
                foodimage: `/uploads/${item.foodimage}`,

                foodprice: item.foodprice,

            };

        });



        return response.status(200).json({ count: items.length, data: items })


    } catch (error) {
        console.log(error.message)
        return response.status(501).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await FOODDETAILS.findById(id)
        return response.status(200).json(result)

    } catch (error) {
        console.error(error.message)
        return response.status(501).send({ message: error.message })

    }
})
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.foodname ||
            !request.body.foodtype ||
            !request.body.foodimage ||
            !request.body.foodprice
        ) {
            return response.status(406).send('Please fill all the field')
        }
        const { id } = request.params
        const result = await FOODDETAILS.findByIdAndUpdate(id, request.body, { new: true })
        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(201).json({ data: result, message: " Dish has been Updated successfully" })


    } catch (error) {
        console.log(error)
        return response.status(501).send(error)
    }
})


router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await FOODDETAILS.findByIdAndDelete(id)
        if (!result) {
            return response.status(404).json("No such Dish")
        }
        return response.status(201).send("Dish has been deleted")

    } catch (error) {
        console.log(error)
        return response.status(501).send(error)

    }
})


export default router;
