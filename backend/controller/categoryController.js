const Joi = require("joi");
const Category = require("../model/category");

categoryController = {

    async addCategory(req, res, next) {
        const CategorySchema = Joi.object({
            cat_name: Joi.string().required(),
            status: Joi.string(),
        });

        const { error } = CategorySchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { cat_name } = req.body;
        let order = 1;
        try {
            const CategoryExit = await Category.exists({ cat_name });
            if (CategoryExit) {

                const error = {
                    status: 409,
                    message: "Category Already Exit",
                }

                return next(error);
            }
        }
        catch (error) {
            return next(error);
        }

        let Categorys;

        try {
            const totalCat = await Category.find({});
            order = totalCat.length + 1;
            // console.log(order)
            // return res.status(201).json('exits');
            const addCategory = new Category({
                cat_name,
                order
            });

            Categorys = await addCategory.save();
        }
        catch (error) {
            return next(error);
        }

        let message = "Category Added Successfully";
        return res.status(201).json({ Categorys, message });

    },

    async getAllCategory(req, res, next) {

        try {
            const CategorysList = await Category.find({ status: 'A' }).sort({ order: 1 });;

            if (CategorysList) {
                return res.status(200).json({ CategorysList });
            }
            else {
                return res.status(404).json({ CategorysList })
            }

        }
        catch (error) {
            return next(error);
        }
    },

    async removeCategory(req, res, next) {
        const deleteSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = deleteSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const deleteData = await Category.deleteOne({ _id: id });

            const { deletedCount } = deleteData;

            if (!deletedCount) {
                return res.status(404).json({ message: "Category Not Exist" });
            }
        }
        catch (error) {
            return next(error);
        }

        return res.status(200).json({ message: "Deleted Successfully" });

    },

    async updateCategory(req, res, next) {
        const updateSchema = Joi.object({
            cat_name: Joi.string().required(),
            status: Joi.string(),
            order: Joi.number(),
            id: Joi.string().required(),
        });

        const { error } = updateSchema.validate(req.body);

        if (error) return next(error);

        const { cat_name, order, status, id } = req.body;

        const orderedData = await Category.find({ _id: { $ne: id }, order: order });
        if (orderedData.length > 0) return res.status(400).json({ message: "Duplicate order. Order must be unique." });

        try {

            const validateId = await Category.findById({ _id: id });
            if (!validateId) return res.status(400).json({ message: "Invalid Id" });

            const updateStatus = await Category.updateOne({ _id: id },
                {
                    cat_name,
                    order,
                    status,
                });

            return res.status(200).json({ message: "Category Updated Successfully" });
        }
        catch (error) {
            return next(error);
        }


    },

    async getAllCategoryById(req, res, next) {
        const getSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = getSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const CategoryData = await Category.findById({ _id: id });

            if (!CategoryData) {
                return res.status(404).json({ message: "Category Not Exist" });
            }
            else {
                return res.status(200).json({ CategoryData });
            }
        }
        catch (error) {
            return next(error);
        }

    },

    async typeCheck(id) {
        const categoryData = await Category.findById({ _id: id })
            .then((res) => {
                let type = 'M';
                if (res.cat_name === 'Festival') type = 'F';
                return type;
            });
        return categoryData;
    }
}
module.exports = categoryController;