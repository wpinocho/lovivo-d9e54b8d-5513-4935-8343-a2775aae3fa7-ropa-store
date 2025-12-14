import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.collections': 'Colecciones',
    'nav.products': 'Productos',
    'nav.blog': 'Blog',
    'nav.cart': 'Carrito',
    
    // Hero
    'hero.title': 'Descubre Tu Estilo',
    'hero.subtitle': 'Colección exclusiva de moda contemporánea',
    'hero.cta': 'Explorar Colección',
    
    // Collections
    'collections.title': 'Nuestras Colecciones',
    'collections.explore': 'Explorar',
    
    // Products
    'products.title': 'Productos Destacados',
    'products.featured': 'NUEVO',
    'products.soldout': 'Agotado',
    'products.addtocart': 'Agregar al Carrito',
    'products.viewmore': 'Ver Más Productos',
    
    // Cart
    'cart.title': 'Tu Carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.emptymsg': 'Agrega algunos productos para comenzar tu compra',
    'cart.continue': 'Continuar Comprando',
    'cart.products': 'Productos',
    'cart.quantity': 'Cantidad',
    'cart.remove': 'Eliminar',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar Compra',
    'cart.items': 'artículos',
    
    // Checkout
    'checkout.contact': 'Contacto',
    'checkout.delivery': 'Envío',
    'checkout.payment': 'Pago',
    'checkout.billing': 'Dirección de facturación',
    'checkout.same': 'Igual a la dirección de envío',
    'checkout.different': 'Usar una dirección de facturación diferente',
    'checkout.email': 'Correo electrónico',
    'checkout.subscribe': 'Enviarme noticias y ofertas por correo',
    'checkout.firstname': 'Nombre',
    'checkout.lastname': 'Apellido',
    'checkout.address': 'Dirección',
    'checkout.apartment': 'Apartamento, suite, etc. (opcional)',
    'checkout.neighborhood': 'Colonia',
    'checkout.postal': 'Código postal',
    'checkout.city': 'Ciudad',
    'checkout.state': 'Estado',
    'checkout.country': 'País / Región',
    'checkout.phone': 'Teléfono',
    'checkout.shipping': 'Envío',
    'checkout.methods': 'Métodos de envío',
    'checkout.pickup': 'Recoger en tienda',
    'checkout.discount': 'Código de descuento',
    'checkout.applycoupon': 'Aplicar',
    'checkout.coupon': 'Ingresa tu cupón',
    'checkout.includes': 'Incluye',
    'checkout.intaxes': 'en impuestos',
    
    // Footer
    'footer.tagline': 'Tu destino de moda contemporánea',
    'footer.links': 'Enlaces',
    'footer.home': 'Inicio',
    'footer.follow': 'Síguenos',
    'footer.rights': 'Todos los derechos reservados',
    
    // Product Detail
    'product.price': 'Precio',
    'product.description': 'Descripción',
    'product.details': 'Detalles',
    'product.related': 'Productos Relacionados',
    
    // Orders
    'orders.title': 'Mis Pedidos',
    'orders.empty': 'No tienes pedidos',
    'orders.order': 'Pedido',
    'orders.date': 'Fecha',
    'orders.status': 'Estado',
    'orders.total': 'Total',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.free': 'GRATIS',
    'common.discount': 'Descuento',
  },
  en: {
    // Navigation
    'nav.collections': 'Collections',
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.cart': 'Cart',
    
    // Hero
    'hero.title': 'Discover Your Style',
    'hero.subtitle': 'Exclusive contemporary fashion collection',
    'hero.cta': 'Explore Collection',
    
    // Collections
    'collections.title': 'Our Collections',
    'collections.explore': 'Explore',
    
    // Products
    'products.title': 'Featured Products',
    'products.featured': 'NEW',
    'products.soldout': 'Sold Out',
    'products.addtocart': 'Add to Cart',
    'products.viewmore': 'View More Products',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptymsg': 'Add some products to start your purchase',
    'cart.continue': 'Continue Shopping',
    'cart.products': 'Products',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.items': 'items',
    
    // Checkout
    'checkout.contact': 'Contact',
    'checkout.delivery': 'Delivery',
    'checkout.payment': 'Payment',
    'checkout.billing': 'Billing address',
    'checkout.same': 'Same as shipping address',
    'checkout.different': 'Use a different billing address',
    'checkout.email': 'Email address',
    'checkout.subscribe': 'Send me news and offers via email',
    'checkout.firstname': 'First name',
    'checkout.lastname': 'Last name',
    'checkout.address': 'Address',
    'checkout.apartment': 'Apartment, suite, etc. (optional)',
    'checkout.neighborhood': 'Neighborhood',
    'checkout.postal': 'Postal code',
    'checkout.city': 'City',
    'checkout.state': 'State',
    'checkout.country': 'Country / Region',
    'checkout.phone': 'Phone',
    'checkout.shipping': 'Shipping',
    'checkout.methods': 'Shipping methods',
    'checkout.pickup': 'Store pickup',
    'checkout.discount': 'Discount code',
    'checkout.applycoupon': 'Apply',
    'checkout.coupon': 'Enter your coupon',
    'checkout.includes': 'Includes',
    'checkout.intaxes': 'in taxes',
    
    // Footer
    'footer.tagline': 'Your contemporary fashion destination',
    'footer.links': 'Links',
    'footer.home': 'Home',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Product Detail
    'product.price': 'Price',
    'product.description': 'Description',
    'product.details': 'Details',
    'product.related': 'Related Products',
    
    // Orders
    'orders.title': 'My Orders',
    'orders.empty': 'You have no orders',
    'orders.order': 'Order',
    'orders.date': 'Date',
    'orders.status': 'Status',
    'orders.total': 'Total',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.free': 'FREE',
    'common.discount': 'Discount',
  },
  fr: {
    // Navigation
    'nav.collections': 'Collections',
    'nav.products': 'Produits',
    'nav.blog': 'Blog',
    'nav.cart': 'Panier',
    
    // Hero
    'hero.title': 'Découvrez Votre Style',
    'hero.subtitle': 'Collection exclusive de mode contemporaine',
    'hero.cta': 'Explorer la Collection',
    
    // Collections
    'collections.title': 'Nos Collections',
    'collections.explore': 'Explorer',
    
    // Products
    'products.title': 'Produits en Vedette',
    'products.featured': 'NOUVEAU',
    'products.soldout': 'Épuisé',
    'products.addtocart': 'Ajouter au Panier',
    'products.viewmore': 'Voir Plus de Produits',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.emptymsg': 'Ajoutez des produits pour commencer vos achats',
    'cart.continue': 'Continuer les Achats',
    'cart.products': 'Produits',
    'cart.quantity': 'Quantité',
    'cart.remove': 'Retirer',
    'cart.subtotal': 'Sous-total',
    'cart.total': 'Total',
    'cart.checkout': 'Passer la Commande',
    'cart.items': 'articles',
    
    // Checkout
    'checkout.contact': 'Contact',
    'checkout.delivery': 'Livraison',
    'checkout.payment': 'Paiement',
    'checkout.billing': 'Adresse de facturation',
    'checkout.same': 'Identique à l\'adresse de livraison',
    'checkout.different': 'Utiliser une adresse de facturation différente',
    'checkout.email': 'Adresse e-mail',
    'checkout.subscribe': 'M\'envoyer des nouvelles et des offres par e-mail',
    'checkout.firstname': 'Prénom',
    'checkout.lastname': 'Nom',
    'checkout.address': 'Adresse',
    'checkout.apartment': 'Appartement, suite, etc. (optionnel)',
    'checkout.neighborhood': 'Quartier',
    'checkout.postal': 'Code postal',
    'checkout.city': 'Ville',
    'checkout.state': 'État/Province',
    'checkout.country': 'Pays / Région',
    'checkout.phone': 'Téléphone',
    'checkout.shipping': 'Expédition',
    'checkout.methods': 'Modes de livraison',
    'checkout.pickup': 'Retrait en magasin',
    'checkout.discount': 'Code de réduction',
    'checkout.applycoupon': 'Appliquer',
    'checkout.coupon': 'Entrez votre coupon',
    'checkout.includes': 'Comprend',
    'checkout.intaxes': 'de taxes',
    
    // Footer
    'footer.tagline': 'Votre destination de mode contemporaine',
    'footer.links': 'Liens',
    'footer.home': 'Accueil',
    'footer.follow': 'Suivez-nous',
    'footer.rights': 'Tous droits réservés',
    
    // Product Detail
    'product.price': 'Prix',
    'product.description': 'Description',
    'product.details': 'Détails',
    'product.related': 'Produits Connexes',
    
    // Orders
    'orders.title': 'Mes Commandes',
    'orders.empty': 'Vous n\'avez aucune commande',
    'orders.order': 'Commande',
    'orders.date': 'Date',
    'orders.status': 'Statut',
    'orders.total': 'Total',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.free': 'GRATUIT',
    'common.discount': 'Réduction',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'es'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}