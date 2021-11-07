const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product, as: 'products'}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const soloCategory = await Category.findByPk(req.params.id,{
      include: [{model: Product, as: 'products'}]
    });
    if (!soloCategory) {
      res.status(404).json({messgae: 'Category does not exist.'});
      return;
    }
    res.status(200).json(soloCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(201).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
      if(!updCategory){
        res.status(404).json({message: 'Category does not exist.'});
        return;
      }
    res.status(201).json(updCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!delCategory){
      res.status(404).json({message: "Category does not exist."});
      return;
    }
    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
