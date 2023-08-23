import { useEffect, useState } from "react";
import "./App.css";
import CategoryForm from "./components/Category";

import NavBar from "./components/NavBar";
import ProductForm from "./components/Products";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let result = products;
    result = filterSearchTitle(result);
    result = sortDate(result);
    result = filterSelectedCategory(result);
    setFilteredProducts(result);
  }, [products, sort, searchValue, selectedCategory]);

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };
  const filterSearchTitle = (array) => {
    return array.filter((p) => p.title.toLowerCase().includes(searchValue));
  };

  const sortDate = (array) => {
    let sorttedProducts = [...array];
    return sorttedProducts.sort((a, b) => {
      if (sort === "latest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "earliest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  };
  const selectCategoryHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterSelectedCategory = (array) => {
    if (!selectedCategory) return array;
    return array.filter((item) => item.categoryId === selectedCategory);
  };

  // useEffect(() => {
  //   const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  //   const savedCategoris = JSON.parse(localStorage.getItem("categories")) || [];
  //   setProducts(savedProducts);
  //   setCategories(savedCategoris);
  // }, []);

  useEffect(() => {
    if (products.length) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  return (
    <div className="">
      <div className="bg-slate-800 min-h-screen">
        <NavBar products={products} />
        <div className="container max-w-screen-sm mx-auto p-4">
          <CategoryForm setCategories={setCategories} />
          <ProductForm categories={categories} setProducts={setProducts} />
          <Filter
            searchValue={searchValue}
            sort={sort}
            onSort={sortHandler}
            onSearch={searchHandler}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectedCategory={selectCategoryHandler}
          />
          <ProductList
            products={filteredProducts}
            setProducts={setProducts}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
