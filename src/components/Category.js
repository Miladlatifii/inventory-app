import { useState } from "react";

const CategoryForm = ({ setCategories }) => {
  const [isShow, setIsShow] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const addNewCategoryHandler = (e) => {
    if (!categoryFormData.title) return alert("enter fields");
    const newCategory = {
      ...categoryFormData,
      createdAt: new Date().toISOString(),
      id: new Date().getTime(),
    };
    setCategories((prevState) => [...prevState, newCategory]);
    setCategoryFormData({ title: "", description: "" });
  };

  return (
    <section>
      <div className={`mb-6 ${isShow ? "" : "hidden"}`} id="category-wrapper">
        <h2 className="text-xl text-slate-300 font-bold mb-2">
          Add New category
        </h2>
        <form
          className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4"
          onSubmit={submitHandler}
        >
          <div>
            <label
              htmlFor="category-title"
              className="block mb-1 text-slate-400"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              id="category-title"
              value={categoryFormData.title}
              onChange={changeHandler}
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            />
          </div>
          <div>
            <label
              htmlFor="category-description"
              className="block mb-1 text-slate-400"
            >
              description
            </label>
            <textarea
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full"
              type=" text"
              name="description"
              id="category-description"
              onChange={changeHandler}
              value={categoryFormData.description}
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <button
              className="flex-1 border border-slate-400 text-slate-400 rounded-xl py-2"
              id="cancel-add-category"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </button>
            <button
              onClick={addNewCategoryHandler}
              id="add-new-category"
              className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
      <button
        id="toggle-add-category"
        className={`text-slate-600 text-lg mb-4 font-medium ${
          isShow && "hidden"
        }`}
        onClick={() => setIsShow((prevState) => !prevState)}
      >
        Add new Category?
      </button>
    </section>
  );
};

export default CategoryForm;
