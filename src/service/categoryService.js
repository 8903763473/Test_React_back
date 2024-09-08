const Category = require('../model/categoryModel');

class CategoryService {
    // static async getAllCategories() {
    //     try {
    //         const categories = await Category.find();
    //         res.json(categories);
    //     } catch (error) {
    //         throw new Error('Error fetching categories');
    //     }
    // }

    static async getCategoryById(id) {
        try {
            return await Category.findById(id);
        } catch (error) {
            throw new Error('Error fetching category');
        }
    }

    static async createCategory(data) {
        try {
            const newCategory = new Category(data);
            return await newCategory.save();
        } catch (error) {
            throw new Error('Error creating category');
        }
    }

    static async updateCategory(id, data) {
        try {
            return await Category.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error('Error updating category');
        }
    }

    static async deleteCategory(id) {
        try {
            return await Category.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting category');
        }
    }
}

module.exports = CategoryService;
