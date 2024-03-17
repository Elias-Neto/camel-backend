import categoryModel from './category.model.js'

const insertCategory = async data => {
  return await categoryModel.create(data)
}

const updateCategory = async (categoryID, data) => {
  await categoryModel.update(data, {
    where: {
      id: categoryID,
      deletedAt: null,
    },
  })
}

const findAllCategory = async () => {
  return await categoryModel.findAll({
    where: {
      deletedAt: null,
    },
  })
}

const findCategoryByID = async categoryID => {
  return await categoryModel.findOne({
    where: {
      id: categoryID,
      deletedAt: null,
    },
  })
}

const findCategoryByName = async name => {
  return await categoryModel.findOne({
    where: {
      name: name,
      deletedAt: null,
    },
  })
}

const deleteCategory = async category_id => {
  return await categoryModel.destroy({
    where: {
      id: category_id,
      deletedAt: null,
    },
  })
}

export {
  insertCategory,
  updateCategory,
  findAllCategory,
  findCategoryByID,
  findCategoryByName,
  deleteCategory,
}
