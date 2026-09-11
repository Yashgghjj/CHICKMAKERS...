import { useState, useEffect, useMemo, FormEvent } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Package,
  Check,
  AlertTriangle,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api';
import type { Product, ProductCategory } from '../../types';

const CATEGORIES: { id: ProductCategory | 'all'; name: string }[] = [
  { id: 'all', name: 'All Products' },
  { id: 'bamboo-chick', name: 'Bamboo Chicks & Blinds' },
  { id: 'bamboo-huts', name: 'Bamboo Huts & Gazebos' },
  { id: 'safety-nets', name: 'Safety & Bird Nets' },
  { id: 'welding-structure', name: 'Welding & Structures' },
  { id: 'artificial-grass', name: 'Artificial Grass' },
];

const PRESET_IMAGES = [
  { label: 'Bamboo Chick', url: '/img/our-services/bamboo-chick.jpg' },
  { label: 'Bamboo Chick Blinds', url: '/img/our-services/bamboo-chick-blinds.jpg' },
  { label: 'Bamboo Hut', url: '/img/our-services/bamboo-hut.jpg' },
  { label: 'Bamboo Fencing', url: '/img/our-services/bamboo-fencing.jpg' },
  { label: 'Pigeon Net', url: '/img/our-services/pigeon-net.jpg' },
  { label: 'Agro Shade Net', url: '/img/our-services/agro-shade-nets.jpg' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('bamboo-chick');
  const [formPrice, setFormPrice] = useState('55');
  const [formMinSqFt, setFormMinSqFt] = useState('12');
  const [formWarranty, setFormWarranty] = useState('3');
  const [formCraftDays, setFormCraftDays] = useState('2');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formMaterials, setFormMaterials] = useState('');
  const [formImage, setFormImage] = useState('/img/our-services/bamboo-chick.jpg');
  const [formBadge, setFormBadge] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await api.getProducts();
      setProducts(res as Product[]);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  function handleOpenAdd() {
    setFormName('');
    setFormCategory('bamboo-chick');
    setFormPrice('55');
    setFormMinSqFt('12');
    setFormWarranty('3');
    setFormCraftDays('2');
    setFormDescription('Artisan hand-woven Assam bamboo blinds with UV-resistant canvas border.');
    setFormFeatures('Hand-woven Assam Bamboo, UV-Proof Canvas Border, Heavy-Duty Pulley Cord, 3-Year Anti-Fungal Warranty');
    setFormMaterials('Assam Golden Bamboo Slats, Marine Grade Cord, Waterproof Cotton Border');
    setFormImage('/img/our-services/bamboo-chick.jpg');
    setFormBadge('');
    setShowAddModal(true);
  }

  function handleOpenEdit(product: Product) {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(String(product.pricePerSqFt));
    setFormMinSqFt(String(product.minSqFt));
    setFormWarranty(String(product.warrantyYears));
    setFormCraftDays(String(product.estimatedCraftDays));
    setFormDescription(product.description);
    setFormFeatures(product.features.join(', '));
    setFormMaterials(product.materials.join(', '));
    setFormImage(product.image);
    setFormBadge(product.badge || '');
  }

  async function handleSaveProduct(e: FormEvent) {
    e.preventDefault();
    if (!formName.trim()) return;

    setFormSubmitting(true);
    try {
      const featuresArray = formFeatures
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);
      const materialsArray = formMaterials
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);

      const payload: Partial<Product> = {
        name: formName.trim(),
        category: formCategory,
        pricePerSqFt: parseFloat(formPrice) || 50,
        minSqFt: parseFloat(formMinSqFt) || 10,
        warrantyYears: parseInt(formWarranty) || 3,
        estimatedCraftDays: parseInt(formCraftDays) || 2,
        description: formDescription.trim(),
        features: featuresArray.length > 0 ? featuresArray : ['Handcrafted Assam Bamboo'],
        materials: materialsArray.length > 0 ? materialsArray : ['Natural Bamboo'],
        image: formImage,
        badge: formBadge.trim() || undefined,
      };

      if (editingProduct) {
        const res = await api.updateProduct(editingProduct.id, payload);
        if (res.success) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? res.product : p)));
          triggerToast('Product updated successfully!');
          setEditingProduct(null);
        }
      } else {
        const res = await api.createProduct(payload);
        if (res.success) {
          setProducts((prev) => [res.product, ...prev]);
          triggerToast('New product added to catalog!');
          setShowAddModal(false);
        }
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to save product');
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleDeleteProduct() {
    if (!deletingProduct) return;
    try {
      const res = await api.deleteProduct(deletingProduct.id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
        triggerToast('Product deleted from catalog');
        setDeletingProduct(null);
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to delete product');
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">Product Catalog</h2>
          <p className="text-xs text-stone-500">
            Create, update and manage bamboo products, custom pricing &amp; specifications
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-xs"
            title="Reload products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title, description, or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-amber-300 font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Rate / Sq.Ft</th>
                <th className="py-3 px-4">Min Sq.Ft</th>
                <th className="py-3 px-4">Warranty &amp; Craft Days</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <Package className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    <p className="font-medium">No products found matching the criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/80 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/our-services/bamboo-chick.jpg';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 truncate max-w-xs">{product.name}</span>
                            {product.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 truncate max-w-sm mt-0.5">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 text-sm">₹{product.pricePerSqFt}</div>
                      <div className="text-[10px] text-stone-400">per sq. ft</div>
                    </td>

                    {/* Min Sq.Ft */}
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {product.minSqFt} sq. ft
                    </td>

                    {/* Specs */}
                    <td className="py-3 px-4">
                      <div className="text-stone-800 font-medium">{product.warrantyYears} Year Warranty</div>
                      <div className="text-[11px] text-stone-500">~{product.estimatedCraftDays} Days Crafting</div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setViewingProduct(product)}
                          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition"
                          title="View specifications"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-stone-600 hover:text-amber-700 transition"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-stone-600 hover:text-red-600 transition"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
                  {editingProduct ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    {editingProduct ? 'Edit Product' : 'Add New Product to Catalog'}
                  </h3>
                  <p className="text-xs text-stone-500">Configure specifications, pricing and craftsmanship details</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              {/* Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Assam Royal Bamboo Chick"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="bamboo-chick">Bamboo Chick &amp; Blinds</option>
                    <option value="bamboo-huts">Bamboo Huts &amp; Gazebos</option>
                    <option value="safety-nets">Safety &amp; Bird Nets</option>
                    <option value="welding-structure">Welding Roof Structure</option>
                    <option value="artificial-grass">Artificial Grass</option>
                  </select>
                </div>
              </div>

              {/* Price, Min SqFt, Warranty, Craft Days */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Rate / Sq.Ft (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Min Sq.Ft</label>
                  <input
                    type="number"
                    min="1"
                    value={formMinSqFt}
                    onChange={(e) => setFormMinSqFt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Warranty (Yrs)</label>
                  <input
                    type="number"
                    min="0"
                    value={formWarranty}
                    onChange={(e) => setFormWarranty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Craft Days</label>
                  <input
                    type="number"
                    min="1"
                    value={formCraftDays}
                    onChange={(e) => setFormCraftDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detail the bamboo weave, sun protection and craftsmanship..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              {/* Features & Materials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Features (comma-separated)</label>
                  <textarea
                    rows={2}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="e.g. UV Proof, Heavy Cord, Anti-Fungal"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Materials (comma-separated)</label>
                  <textarea
                    rows={2}
                    value={formMaterials}
                    onChange={(e) => setFormMaterials(e.target.value)}
                    placeholder="e.g. Assam Bamboo, Cotton Border, Brass Pulley"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              {/* Image selector & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => setFormImage(preset.url)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          formImage === preset.url
                            ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                            : 'bg-stone-100 border-stone-200 text-stone-600'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Optional Highlight Badge</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. Bestseller, 5-Yr Warranty, New Design"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                  {/* Image Preview */}
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200 bg-stone-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/our-services/bamboo-chick.jpg';
                      }}
                    />
                    <div className="text-[11px] text-stone-500">Live preview thumbnail</div>
                  </div>
                </div>
              </div>

              {/* Submit / Cancel buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20 transition disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving Product...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Delete Product?</h3>
            <p className="text-xs text-stone-500 mb-6">
              Are you sure you want to remove <span className="font-bold text-stone-800">"{deletingProduct.name}"</span> from the catalog? Customers will no longer be able to calculate quotes for this item.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="relative h-48 bg-stone-900">
              <img
                src={viewingProduct.image}
                alt={viewingProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/our-services/bamboo-chick.jpg';
                }}
              />
              <button
                onClick={() => setViewingProduct(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                <X className="w-4 h-4" />
              </button>
              {viewingProduct.badge && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 font-bold text-xs shadow-md">
                  {viewingProduct.badge}
                </div>
              )}
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                  {viewingProduct.category.replace('-', ' ')}
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-0.5">{viewingProduct.name}</h3>
                <p className="text-stone-600 text-xs mt-1 leading-relaxed">{viewingProduct.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <div>
                  <div className="text-stone-400 text-[10px]">Price / Sq.Ft</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">₹{viewingProduct.pricePerSqFt}</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[10px]">Min Area</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{viewingProduct.minSqFt} sq.ft</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[10px]">Warranty</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{viewingProduct.warrantyYears} Years</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Key Features</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {viewingProduct.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-stone-800 mb-1.5">Materials Used</div>
                <div className="flex flex-wrap gap-1.5">
                  {viewingProduct.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setViewingProduct(null)}
                  className="px-4 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
