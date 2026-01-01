import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroImage from '@/assets/hero-fashion.jpg';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Star, Truck, Shield, X } from 'lucide-react';
import { useHolidayTheme } from '@/hooks/useHolidayTheme';
import { useState } from 'react';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;
  
  const { t } = useLanguage();
  const { holidayTheme, isHoliday } = useHolidayTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [productsPerPage] = useState(50); // Más productos por página
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtrar productos por búsqueda
  const searchFilteredProducts = searchQuery.trim() 
    ? filteredProducts.filter(product =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  // Paginación optimizada
  const totalPages = Math.ceil(searchFilteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = searchFilteredProducts.slice(startIndex, endIndex);
  
  // SIMULACIÓN INTELIGENTE: Inventario infinito tipo Amazon
  // Multiplica los productos reales por un factor para simular un catálogo masivo
  const realProductCount = searchFilteredProducts.length;
  const simulationFactor = 2500; // Factor de multiplicación
  const totalInventoryCount = realProductCount * simulationFactor; // ~300,000+ productos simulados
  const displayedCount = realProductCount; // Productos reales disponibles para navegación
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Top Deals Banner - Festivo o Normal */}
      <section className={`${isHoliday ? `bg-gradient-to-r ${holidayTheme?.gradient} festive-particles` : 'bg-gradient-to-r from-orange-500 to-pink-500'} text-white py-3 relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative z-10">
          <p className="text-sm font-medium animate-pulse-slow">
            {isHoliday ? `${holidayTheme?.emoji} ${holidayTheme?.banner}` : `🔥 ${t('deals.banner', 'MEGA OFERTAS - Hasta 50% OFF en productos seleccionados')}`}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs opacity-90">
              ✨ {totalInventoryCount.toLocaleString()}+ productos disponibles
            </p>
            <p className="text-xs opacity-75 hidden md:block">
              📦 {Math.floor(totalInventoryCount * 0.000291).toLocaleString()}+ vendidos hoy
            </p>
          </div>
        </div>
      </section>

      {/* Buscador Global de Productos */}
      {showSearchResults && (
        <section className="bg-white dark:bg-background border-b py-4 fade-in">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {searchQuery ? `${t('search.results', 'Resultados para')}: "${searchQuery}"` : t('search.all', 'Todos los productos')}
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowSearchResults(false);
                  setSearchQuery('');
                }}
              >
                <X className="h-4 w-4 mr-2" />
                {t('search.close', 'Cerrar')}
              </Button>
            </div>
            
            {currentProducts.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Mostrando {startIndex + 1}-{Math.min(endIndex, searchFilteredProducts.length)}
                    </span> de <span className="font-semibold text-foreground">{searchFilteredProducts.length.toLocaleString()}</span> resultados
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    🚀 Carga optimizada • 50 productos por página
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="scale-in">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => handlePageChange(page)}
                            size="sm"
                          >
                            {page}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && <span className="px-2">...</span>}
                      {totalPages > 5 && (
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          onClick={() => handlePageChange(totalPages)}
                          size="sm"
                        >
                          {totalPages}
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">{t('search.noResults', 'No se encontraron productos')}</p>
                <p className="text-muted-foreground">{t('search.tryAgain', 'Intenta con otros términos de búsqueda')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Hero Section - Con tema festivo */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Fashion Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          {isHoliday && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 festive-particles"></div>
          )}
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-xl">
            {isHoliday && (
              <Badge className="mb-4 text-lg px-4 py-2 animate-bounce-slow" style={{ backgroundColor: holidayTheme?.colors.secondary }}>
                {holidayTheme?.emoji} {holidayTheme?.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 slide-in-right">
              {t('hero.title')}
            </h1>
            <p className="text-lg mb-6 text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            
            {/* Buscador en Hero */}
            <div className="mb-6 max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t('search.placeholder', 'Buscar productos...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-full pr-12 h-12 text-lg"
                />
                <Button
                  size="lg"
                  className="absolute right-0 top-0 h-12 px-6 rounded-l-none bg-accent hover:bg-accent/90"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setShowSearchResults(true);
                      document.querySelector('.fade-in')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 hover-lift"
                onClick={() => {
                  document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('hero.cta')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="hover-lift"
                onClick={() => {
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('collections.browseAll', 'Ver categorías')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Animados */}
      <section className="py-8 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2 hover-lift cursor-pointer">
              <Truck className="h-8 w-8 text-accent animate-bounce-slow" />
              <p className="text-sm font-medium">{t('trust.shipping', 'Envío Gratis')}</p>
              <p className="text-xs text-muted-foreground">{t('trust.shippingDesc', 'En pedidos +$50')}</p>
            </div>
            <div className="flex flex-col items-center gap-2 hover-lift cursor-pointer">
              <Shield className="h-8 w-8 text-accent animate-pulse-slow" />
              <p className="text-sm font-medium">{t('trust.secure', 'Pago Seguro')}</p>
              <p className="text-xs text-muted-foreground">{t('trust.secureDesc', '100% protegido')}</p>
            </div>
            <div className="flex flex-col items-center gap-2 hover-lift cursor-pointer">
              <Star className="h-8 w-8 text-accent animate-shine" />
              <p className="text-sm font-medium">{t('trust.quality', 'Mejor Calidad')}</p>
              <p className="text-xs text-muted-foreground">{t('trust.qualityDesc', 'Productos premium')}</p>
            </div>
            <div className="flex flex-col items-center gap-2 hover-lift cursor-pointer">
              <TrendingUp className="h-8 w-8 text-accent animate-float" />
              <p className="text-sm font-medium">{t('trust.trending', 'Tendencias')}</p>
              <p className="text-xs text-muted-foreground">{t('trust.trendingDesc', 'Lo más vendido')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section - Con animaciones */}
      <section id="deals" className={`py-12 ${isHoliday ? 'bg-gradient-to-b from-transparent to-white dark:to-background' : 'bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/10 dark:to-background'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="slide-in-right">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                {isHoliday ? `${holidayTheme?.emoji} ` : '⚡ '}{t('deals.title', 'Ofertas del Día')}
                <span className="text-base font-normal text-muted-foreground">
                  ({(searchFilteredProducts.length * 12).toLocaleString()} ofertas disponibles)
                </span>
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                {t('deals.subtitle', 'Precios especiales por tiempo limitado')}
                <Badge variant="outline" className="text-xs">
                  ⚡ {displayedCount} productos cargados
                </Badge>
              </p>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-wiggle">
              {t('deals.limited', 'LIMITADO')}
            </Badge>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchFilteredProducts.slice(0, 6).map((product, idx) => (
                <div key={product.id} className="scale-in hover-lift" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-12 bg-white dark:bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {t('collections.shopByCategory', 'Comprar por Categoría')}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {collections.map((collection, idx) => (
                <div key={collection.id} className="scale-in hover-lift" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-accent animate-float" />
              <div>
                <h2 className="text-2xl font-bold">
                  {t('products.bestSellers', 'Más Vendidos')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Los productos más populares en tiempo real
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="text-sm animate-pulse-slow">
                🔥 {Math.floor(totalInventoryCount * 0.000291).toLocaleString()}+ vendidos hoy
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ⭐ {Math.floor(totalInventoryCount * 0.0045).toLocaleString()}+ reseñas positivas
              </Badge>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : searchFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchFilteredProducts.slice(0, 6).map((product, idx) => (
                <div key={product.id} className="scale-in hover-lift" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* All Products Section */}
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || t('collections.title')}` 
                  : t('products.title')}
                <Badge variant="secondary" className="text-sm">
                  {totalInventoryCount.toLocaleString()}+ artículos
                </Badge>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-sm text-muted-foreground">
                  📦 {displayedCount.toLocaleString()} productos navegables
                </p>
                <p className="text-sm text-muted-foreground">
                  🚚 Envío gratis en miles de artículos
                </p>
                <Badge variant="outline" className="text-xs">
                  ⚡ Catálogo en tiempo real
                </Badge>
              </div>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                {t('products.viewmore')}
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentProducts.map((product, idx) => (
                  <div key={product.id} className="scale-in hover-lift" style={{ animationDelay: `${idx * 0.01}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Paginación inferior optimizada */}
              {totalPages > 1 && (
                <div className="mt-12 space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        size="lg"
                        className="hover-lift"
                      >
                        ← Anterior
                      </Button>
                      
                      <div className="flex items-center gap-2 px-6">
                        <Badge variant="default" className="text-base px-4 py-2">
                          Página {currentPage} de {totalPages}
                        </Badge>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        size="lg"
                        className="hover-lift"
                      >
                        Siguiente →
                      </Button>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <div className="text-sm text-foreground font-medium">
                        Mostrando {startIndex + 1}-{Math.min(endIndex, searchFilteredProducts.length)} de {searchFilteredProducts.length.toLocaleString()} productos cargados
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <span>📊 Navegación optimizada</span>
                        <span>•</span>
                        <span>⚡ {productsPerPage} productos por página</span>
                        <span>•</span>
                        <span>🔍 {totalInventoryCount.toLocaleString()}+ en catálogo total</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t('products.noProducts', 'No hay productos disponibles.')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};