import React, { useId, useMemo, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";

function Field({ label, required, children, hint, htmlFor }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#3b2a23]">
        {label} {required ? <span className="text-[#ab8351]">*</span> : null}
      </label>
      {hint ? <div className="text-xs text-[#7c6a5a]">{hint}</div> : null}
      {children}
    </div>
  );
}

function TextInput({ id, value, onChange, placeholder, type = "text", required }) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
      className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
    />
  );
}

function TextArea({ id, value, onChange, placeholder }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
    />
  );
}

export default function DashboardAddProduct({ categories: categoriesProp, brands: brandsProp, flavors: flavorsProp }) {
  const formId = useId();
  const [values, setValues] = useState({
    name: "",
    description: "",
    information: "",
    category: "",
    flavor: "",
    weight: "",
    packetsPerJar: "",
    brand: "",
    dietType: "",
    unitPrice: "",
    stockQty: "",
    discountAmount: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const categories = useMemo(() => {
    const fallback = ["Truffles", "Chocolates", "Spreads", "Lollipops"];
    if (!Array.isArray(categoriesProp)) return fallback;
    return categoriesProp.filter((c) => c?.isActive).map((c) => c.name).filter(Boolean);
  }, [categoriesProp]);

  const brands = useMemo(() => {
    const fallback = ["Cadbury", "Amul", "Nestle", "Ferrero", "Hershey's", "Lindt", "Other"];
    if (!Array.isArray(brandsProp)) return fallback;
    return brandsProp.filter((b) => b?.isActive).map((b) => b.name).filter(Boolean);
  }, [brandsProp]);
  const dietTypes = useMemo(
    () => ["Vegetarian", "Non-Vegetarian", "Vegan", "Sugarfree", "Glutenfree"],
    []
  );
  const flavors = useMemo(() => {
    const fallback = ["Chocolate", "Vanilla", "Strawberry", "Mint", "Caramel", "Hazelnut", "Coffee", "Fruit", "Other"];
    if (!Array.isArray(flavorsProp)) return fallback;
    return flavorsProp.filter((f) => f?.isActive).map((f) => f.name).filter(Boolean);
  }, [flavorsProp]);
  const availableTags = useMemo(
    () => [
      "Gluten Free", "Sugar Free", "Vegan", "Organic", "Dark Chocolate", 
      "Milk Chocolate", "White Chocolate", "Nuts", "Fruits", "Gift Pack", 
      "Best Seller", "New Arrival", "Egg Free", "Allergen-Free", "Premium"
    ],
    []
  );

  const update = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files ?? []);
    setAdditionalImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = (tag) => {
    if (tags.length >= 4) return;
    if (!tag) return;
    
    setTags((prev) => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
    setTagInput("");
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const filteredTags = useMemo(() => {
    if (!tagInput) return [];
    return availableTags.filter(
      (t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(t)
    );
  }, [tagInput, tags, availableTags]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#3b2a23]">Add New Product</h2>
        <p className="text-[#7c6a5a] mt-1 text-sm">Fill product details and upload images.</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Images */}
        <div className="bg-white rounded-lg border border-[#ececec] p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="text-sm font-bold text-[#3b2a23]">
              Product Images <span className="text-[#ab8351]">*</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-md bg-[#f7f7f7] px-3 py-1 text-xs font-semibold text-[#3b2a23]">
              Ratio 1:1 (500 x 500 px) <FiInfo className="text-[#7c6a5a]" />
            </span>
          </div>

          <input
            id={`${formId}-images`}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <label
              htmlFor={`${formId}-images`}
              className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#ececec] bg-[#fffaf9] hover:bg-[#ffedea] transition-colors"
            >
              <div className="mb-2 text-[#ab8351] text-2xl">
                <FiImage />
              </div>
              <div className="text-xs font-semibold text-[#3b2a23] text-center px-2">Click to upload</div>
            </label>

            {additionalImages.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-lg border border-[#ececec] overflow-hidden group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] font-bold text-center py-1">
                    Thumbnail
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-[#7c6a5a]">
            The first image will be used as the product thumbnail. You can upload multiple images at once.
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg border border-[#ececec] p-5">
          <div className="text-sm font-bold text-[#3b2a23] mb-4">Product Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Product name" required>
              <TextInput
                id={`${formId}-name`}
                value={values.name}
                onChange={update("name")}
                placeholder="Enter product name"
                required
              />
            </Field>

            <Field label="Category">
              <select
                id={`${formId}-category`}
                value={values.category}
                onChange={update("category")}
                className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Brand">
              <select
                id={`${formId}-brand`}
                value={values.brand}
                onChange={update("brand")}
                className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              >
                <option value="">Select brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Flavor">
              <select
                id={`${formId}-flavor`}
                value={values.flavor}
                onChange={update("flavor")}
                className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              >
                <option value="">Select flavor</option>
                {flavors.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Diet Type">
              <select
                id={`${formId}-diet`}
                value={values.dietType}
                onChange={update("dietType")}
                className="w-full rounded-lg border border-[#ececec] bg-white px-4 py-3 text-sm text-[#3b2a23] outline-none focus:border-[#ab8351]"
              >
                <option value="">Select diet type</option>
                {dietTypes.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Weight">
              <TextInput
                id={`${formId}-weight`}
                value={values.weight}
                onChange={update("weight")}
                placeholder="e.g., 250g"
              />
            </Field>

            <Field label="Packets per Jar">
              <TextInput
                id={`${formId}-packetsPerJar`}
                value={values.packetsPerJar}
                onChange={update("packetsPerJar")}
                placeholder="e.g., 10"
                type="number"
              />
            </Field>

            <Field label="Tags" hint="Select up to 4 tags from the list.">
              <div className="relative w-full">
                <div className="w-full rounded-lg border border-[#ececec] bg-white px-3 py-2 text-sm text-[#3b2a23] outline-none focus-within:border-[#ab8351]">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-md bg-[#f7f7f7] px-3 py-1 text-xs font-semibold text-[#3b2a23]"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-[#7c6a5a] hover:text-[#3b2a23]"
                          aria-label={`Remove ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    <input
                      id={`${formId}-tags`}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder={tags.length >= 4 ? "Max tags reached" : "Type to search tags..."}
                      disabled={tags.length >= 4}
                      className="min-w-40 flex-1 bg-transparent px-2 py-1 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                
                {/* Dropdown */}
                {filteredTags.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-[#ececec] bg-white shadow-lg max-h-60 overflow-auto">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="w-full text-left px-4 py-2 text-sm text-[#3b2a23] hover:bg-[#fffaf9] hover:text-[#ab8351]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>

            <Field label="Unit Price (₹)" required>
              <TextInput
                id={`${formId}-unitPrice`}
                value={values.unitPrice}
                onChange={update("unitPrice")}
                placeholder="0"
                type="number"
                required
              />
            </Field>

            <Field label="Current Stock Qty" required>
              <TextInput
                id={`${formId}-stockQty`}
                value={values.stockQty}
                onChange={update("stockQty")}
                placeholder="0"
                type="number"
                required
              />
            </Field>

            <Field label="Discount Amount (₹)" required>
              <TextInput
                id={`${formId}-discountAmount`}
                value={values.discountAmount}
                onChange={update("discountAmount")}
                placeholder="0"
                type="number"
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <Field label="Description">
              <TextArea
                id={`${formId}-description`}
                value={values.description}
                onChange={update("description")}
                placeholder="Write product description"
              />
            </Field>

            <Field label="Information">
              <TextArea
                id={`${formId}-information`}
                value={values.information}
                onChange={update("information")}
                placeholder="Write product information"
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-lg bg-[#ab8351] hover:bg-[#7d572d] cursor-pointer px-6 py-3 text-sm font-bold text-white hover:opacity-95"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
