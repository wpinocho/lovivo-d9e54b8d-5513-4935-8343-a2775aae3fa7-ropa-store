import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
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

  const header = (
    <div className={`py-4 border-b ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {!loadingCollections && hasCollections && (
                <ScrollLink 
                  to="/#collections" 
                  className="text-sm font-light tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
                >
                  {t('nav.collections')}
                </ScrollLink>
              )}
              <ScrollLink 
                to="/#products" 
                className="text-sm font-light tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
              >
                {t('nav.products')}
              </ScrollLink>
              <Link 
                to="/blog" 
                className="text-sm font-light tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
              >
                {t('nav.blog')}
              </Link>
            </nav>
          </div>

          {/* Profile, Language & Cart */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-primary text-primary-foreground ${footerClassName}`}>
      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.svg" 
                  alt="Style Logo"
                  className="h-10 w-10 object-contain invert" 
                />
                <span className="text-2xl font-light tracking-widest">STYLE</span>
              </div>
              <p className="mt-4 font-light tracking-wide opacity-70 text-sm">
                {t('footer.tagline')}
              </p>
              <div className="mt-6">
                <h3 className="font-light tracking-widest uppercase text-xs mb-3 opacity-90">{t('footer.follow')}</h3>
                <SocialLinks />
              </div>
            </div>

            {/* Conócenos */}
            <div>
              <h3 className="font-medium text-sm mb-4">Conócenos</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Sobre Nosotros
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Carreras
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Inversores
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Sostenibilidad
                </Link>
              </div>
            </div>

            {/* Atención al Cliente */}
            <div>
              <h3 className="font-medium text-sm mb-4">Atención al Cliente</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Centro de Ayuda
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Envíos
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Devoluciones
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Garantías
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Contacto
                </Link>
              </div>
            </div>

            {/* Comprar */}
            <div>
              <h3 className="font-medium text-sm mb-4">Comprar</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Ofertas del Día
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Categorías
                </Link>
                <Link to="/blog" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Gift Cards
                </Link>
              </div>
            </div>

            {/* Mi Cuenta */}
            <div>
              <h3 className="font-medium text-sm mb-4">Mi Cuenta</h3>
              <div className="space-y-2">
                <Link to="/my-orders" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Mis Pedidos
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Lista de Deseos
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Suscripciones
                </Link>
                <Link to="/" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Perfil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary-foreground/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="opacity-70">
              &copy; 2025 Style. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">
                Términos y Condiciones
              </Link>
              <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">
                Privacidad
              </Link>
              <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">
                Cookies
              </Link>
            </div>
          </div>
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