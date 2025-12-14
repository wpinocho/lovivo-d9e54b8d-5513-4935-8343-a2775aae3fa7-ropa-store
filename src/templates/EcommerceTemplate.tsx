import { ReactNode, useState } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search, MapPin, Menu } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const header = (
    <div className={`border-b ${headerClassName}`}>
      {/* Top bar */}
      <div className="bg-background border-b py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t('header.deliverTo', 'Entregar en')}</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <BrandLogoLeft />
            </div>

            {/* Search Bar - Amazon style */}
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t('header.searchPlaceholder', 'Buscar productos...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 h-10"
                />
                <Button
                  size="sm"
                  className="absolute right-0 top-0 h-10 px-4 rounded-l-none"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ProfileMenu />
              
              {showCart && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openCart}
                  className="relative flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">{t('cart.cart', 'Carrito')}</span>
                    <span className="text-sm font-bold">{totalItems}</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 left-3 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-muted/50 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="gap-2">
              <Menu className="h-4 w-4" />
              {t('nav.allCategories', 'Todas las categorías')}
            </Button>
            {!loadingCollections && hasCollections && (
              <ScrollLink 
                to="/#collections" 
                className="text-sm hover:text-accent transition-colors"
              >
                {t('nav.collections')}
              </ScrollLink>
            )}
            <ScrollLink 
              to="/#products" 
              className="text-sm hover:text-accent transition-colors"
            >
              {t('nav.products')}
            </ScrollLink>
            <ScrollLink 
              to="/#deals" 
              className="text-sm text-accent font-medium hover:text-accent/80 transition-colors"
            >
              {t('nav.deals', 'Ofertas')}
            </ScrollLink>
            <Link 
              to="/blog" 
              className="text-sm hover:text-accent transition-colors"
            >
              {t('nav.blog')}
            </Link>
          </div>
        </div>
      </div>

      {/* Page Title */}
      {pageTitle && (
        <div className="py-4 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        </div>
      )}
    </div>
  )

  const footer = (
    <div className={`bg-muted/50 border-t ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.aboutUs', 'Conócenos')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.about', 'Sobre nosotros')}
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.careers', 'Careers')}
              </Link>
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('nav.blog')}
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.customerService', 'Atención al Cliente')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.contact', 'Contacto')}
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.returns', 'Devoluciones')}</n              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.shipping', 'Envíos')}
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.shop', 'Comprar')}</h3>
            <div className="space-y-2">
              <ScrollLink to="/#deals" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('nav.deals', 'Ofertas')}
              </ScrollLink>
              <ScrollLink to="/#collections" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('nav.collections')}
              </ScrollLink>
              <ScrollLink to="/#products" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('nav.products')}
              </ScrollLink>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.account', 'Mi Cuenta')}</h3>
            <div className="space-y-2">
              <Link to="/my-orders" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.orders', 'Mis pedidos')}
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.wishlist', 'Lista de deseos')}
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.account', 'Mi cuenta')}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.legal', 'Legal')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.privacy', 'Privacidad')}
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.terms', 'Términos')}</n              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                {t('footer.cookies', 'Cookies')}
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-sm mb-4">{t('footer.follow')}</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Style. {t('footer.rights')}.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}