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

export default function DashboardAddProduct({ categories: categoriesProp, brands: brandsProp }) {
  const formId = useId();
  const [values, setValues] = useState({
    name: "",
    description: "",
    information: "",
    category: "",
    flavor: "",
    weight: "",
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

  const update = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const addTag = (raw) => {
    const cleaned = (raw ?? "").trim().replace(/^#/, "");
    if (!cleaned) return;

    const key = cleaned.toLowerCase();
    setTags((prev) => {
      const already = prev.some((t) => t.toLowerCase() === key);
      if (already) return prev;
      return [...prev, cleaned];
    });
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onTagKeyDown = (e) => {
    if (e?.nativeEvent?.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const onTagChange = (e) => {
    const next = e.target.value;
    if (!next.includes(",")) {
      setTagInput(next);
      return;
    }

    const parts = next.split(",").map((p) => p.trim()).filter(Boolean);
    if (!parts.length) {
      setTagInput("");
      return;
    }

    // Add all complete tags; keep last part as current input only if original didn't end with comma
    const endsWithComma = /,\s*$/.test(next);
    const toAdd = endsWithComma ? parts : parts.slice(0, -1);
    const remaining = endsWithComma ? "" : parts[parts.length - 1];
    toAdd.forEach(addTag);
    setTagInput(remaining);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#3b2a23]">Add New Product</h2>
        <p className="text-[#7c6a5a] mt-1 text-sm">Fill product details and upload images.</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-[#ececec] p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="text-sm font-bold text-[#3b2a23]">
                Product thumbnail <span className="text-[#ab8351]">*</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#f7f7f7] px-3 py-1 text-xs font-semibold text-[#3b2a23]">
                Ratio 1:1 (500 x 500 px) <FiInfo className="text-[#7c6a5a]" />
              </span>
            </div>

            <input
              id={`${formId}-thumbnail`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
            />

            <label
              htmlFor={`${formId}-thumbnail`}
              className="mt-4 flex h-[170px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#ececec] bg-white px-4 text-center hover:bg-[#ffedea] transition-colors"
            >
              <div className="mb-2 text-[#ab8351] text-2xl">
                <FiImage />
              </div>
              <div className="text-sm font-semibold text-[#3b2a23]">Click to upload</div>
              <div className="text-xs text-[#7c6a5a]">or drag and drop</div>
              {thumbnail ? (
                <div className="mt-3 text-xs font-semibold text-[#3b2a23] break-all">{thumbnail.name}</div>
              ) : null}
            </label>
          </div>

          <div className="bg-white rounded-lg border border-[#ececec] p-5">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="text-sm font-bold text-[#3b2a23]">Upload additional image</div>
              <span className="inline-flex items-center gap-2 rounded-md bg-[#f7f7f7] px-3 py-1 text-xs font-semibold text-[#3b2a23]">
                Ratio 1:1 (500 x 500 px) <FiInfo className="text-[#7c6a5a]" />
              </span>
            </div>
            <div className="text-xs text-[#7c6a5a]">Upload additional product images</div>

            <input
              id={`${formId}-additional`}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setAdditionalImages(Array.from(e.target.files ?? []))}
            />

            <div className="mt-6">
              <label
                htmlFor={`${formId}-additional`}
                className="flex h-[140px] w-[170px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#ececec] bg-white px-4 text-center hover:bg-[#ffedea] transition-colors"
              >
                <div className="mb-2 text-[#ab8351] text-2xl">
                  <FiImage />
                </div>
                <div className="text-sm font-semibold text-[#3b2a23]">Click to upload</div>
                <div className="text-xs text-[#7c6a5a]">or drag and drop</div>
              </label>

              {additionalImages.length ? (
                <div className="mt-3 text-xs text-[#3b2a23] font-semibold">
                  {additionalImages.length} file(s) selected
                </div>
              ) : null}
            </div>
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
              <TextInput
                id={`${formId}-flavor`}
                value={values.flavor}
                onChange={update("flavor")}
                placeholder="Enter flavor"
              />
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

            <Field label="Tags" hint="Type a tag and press Enter (or comma).">
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
                    onChange={onTagChange}
                    onKeyDown={onTagKeyDown}
                    onBlur={() => {
                      if (tagInput.trim()) {
                        addTag(tagInput);
                        setTagInput("");
                      }
                    }}
                    placeholder={tags.length ? "Add more tags" : "e.g., vegetarian"}
                    className="min-w-40 flex-1 bg-transparent px-2 py-1 outline-none"
                  />
                </div>
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
