import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Category, Brand, SiteSettings } from '../types';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import BrandsList from '../components/BrandsList';
import HeroSlider from '../components/HeroSlider';
import ProductModal from '../components/ProductModal';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalProducts, setModalProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  try {
    setError(null);

    // Fetch site settings first
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .single();  // Remova .single() se houver mais de um registro em site_settings

    if (settingsError) {
      throw new Error(`Erro ao carregar configurações do site: ${settingsError.message}`);
    }

    setSettings(settingsData);

    // Fetch other data in parallel
    const [categoriesRes, brandsRes, featuredRes] = await Promise.all([
      supabase.from('categories').select('*'),
      supabase.from('brands').select('*'),
      supabase.from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('is_featured', true)
        .limit(6)
    ]);

    if (categoriesRes.error) throw new Error(`Erro ao carregar categorias: ${categoriesRes.error.message}`);
    if (brandsRes.error) throw new Error(`Erro ao carregar marcas: ${brandsRes.error.message}`);
    if (featuredRes.error) throw new Error(`Erro ao carregar produtos em destaque: ${featuredRes.error.message}`);

    setCategories(categoriesRes.data || []);
    setBrands(brandsRes.data || []);
    setFeaturedProducts(featuredRes.data || []);

    // Fetch regular products
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*, brand:brands(*), category:categories(*)')
      .limit(6);

    if (productsError) throw new Error(`Erro ao carregar produtos: ${productsError.message}`);
    setProducts(productsData || []);

  } catch (error: any) {
    console.error('Error fetching data:', error);
    setError(error.message || 'Erro ao carregar dados');
  } finally {
    setIsLoading(false);
  }
};

  const handleCategoryClick = async (category: Category) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('category_id', category.id);

      if (error) throw error;

      setModalProducts(data || []);
      setModalTitle(`Produtos da categoria ${category.name}`);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching category products:', error);
      toast.error('Erro ao carregar produtos da categoria');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrandClick = async (brandId: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('brand_id', brandId);

      if (error) throw error;

      setModalProducts(data || []);
      const brand = brands.find(b => b.id === brandId);
      setModalTitle(`Produtos da marca ${brand?.name}`);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching brand products:', error);
      toast.error('Erro ao carregar produtos da marca');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setModalProducts([product]);
    setModalTitle('Produto');
    setIsModalOpen(true);
  };

  const handleWhatsAppClick = (product: Product) => {
    const message = `Olá! Gostaria de saber mais sobre o produto: ${product.name}`;
    const whatsappNumber = "351961217829";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-24">
      {/* Hero Slider */}
      {settings.show_hero_slides && <HeroSlider />}

      {/* Personal Shopper Section */}
      {settings.show_personal_shopper && (
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[400px] md:h-[600px] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="max-w-4xl mx-auto px-4 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-light mb-4 md:mb-8">Personal Shopper</h2>
                <p className="text-base md:text-lg mb-4 md:mb-6">
                  Como Personal Shopper, meu objetivo é transformar sua experiência de compra em algo excepcional. Seja no setor de moda, beleza ou lifestyle, estou aqui para oferecer um serviço de compras personalizadas que atende às suas necessidades e desejos específicos.
                </p>
                <p className="text-base md:text-lg mb-4 md:mb-6">
                  Desde a seleção de peças exclusivas até a criação de looks completos que refletem seu estilo pessoal, estou dedicada a garantir que cada compra seja perfeita para você.
                </p>
                <p className="text-base md:text-lg mb-6 md:mb-8">
                  Entre em contato e permita-me tornar suas compras uma experiência prazerosa e inesquecível.
                </p>
                <a
                  href="https://wa.me/351961217829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="text-sm md:text-base">Falar com Personal Shopper</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {settings.show_featured_products && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">{settings.featured_products_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                onWhatsAppClick={handleWhatsAppClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Brands Section */}
      {settings.show_brands && brands.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">{settings.brands_title}</h2>
          </div>
          <BrandsList brands={brands} onBrandClick={handleBrandClick} />
        </section>
      )}

      {/* Categories Section */}
      {settings.show_categories && categories.length > 0 && (
        <section className="bg-gray-50 py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-4">{settings.categories_title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={handleCategoryClick}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      {settings.show_all_products && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mb-12 md:mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light">Todos os Produtos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                onWhatsAppClick={handleWhatsAppClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Product Modal */}
      <ProductModal
        products={modalProducts}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/351961217829"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </div>
  );
};

export default Home;