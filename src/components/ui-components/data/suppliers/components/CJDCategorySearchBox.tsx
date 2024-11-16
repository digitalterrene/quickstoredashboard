import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Assuming correct import based on your setup

const CJDCategorySearchBox = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const categoriesString = localStorage.getItem("cjd_category_list"); // Adjust key as needed
    if (categoriesString) {
      const parsedCategories = JSON.parse(categoriesString);
      console.log({ categoriesString: "test" });
      setCategories(parsedCategories);
      setFilteredCategories(parsedCategories);
    }
  }, []);

  // Function to handle search input and filter categories
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = categories.filter(
      (category) =>
        category.categoryFirstName.toLowerCase().includes(query) ||
        category.categoryFirstList.some((secondCategory: any) =>
          secondCategory.categorySecondName.toLowerCase().includes(query)
        )
    );
    setFilteredCategories(filtered);
  };

  // Flatten categories for the select options
  const categoryOptions = filteredCategories.flatMap((category) => [
    { id: category.categoryFirstId, name: category.categoryFirstName },
    ...category.categoryFirstList.flatMap((secondCategory: any) => [
      {
        id: secondCategory.categorySecondId,
        name: secondCategory.categorySecondName,
      },
      ...secondCategory.categorySecondList.map((thirdCategory: any) => ({
        id: thirdCategory.categoryId,
        name: thirdCategory.categoryName,
      })),
    ]),
  ]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = event.target.value;

    try {
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(url.search);

      if (selectedCategoryId) {
        // Add or update the category ID in the URL
        urlParams.set("cjdCategoryId", selectedCategoryId);
        url.search = urlParams.toString();
        router.replace(url.toString(), undefined); // Update the URL without adding to history
      } else {
        // Remove the category ID if no category is selected
        urlParams.delete("cjdCategoryId");
        url.search = urlParams.toString();
        router.replace(url.toString(), undefined);
      }
    } catch (err: any) {
      console.error("Error updating category ID in URL:", err.message);
    }
  };

  return (
    <div className="max-w-lg">
      {/* Category Select */}
      <div className="w-full">
        <select
          className="py-2 px-3 block w-48 border-gray-200 rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
          onChange={handleCategoryChange}
          value={searchQuery} // Optional: Sync with searchQuery if needed
        >
          <option value="">Select a category</option>
          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CJDCategorySearchBox;
