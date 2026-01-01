/**
 * Hook para detectar fechas festivas y aplicar temas automáticamente
 */

export interface HolidayTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  emoji: string
  banner: string
  gradient: string
}

export const useHolidayTheme = () => {
  const getHolidayTheme = (): HolidayTheme | null => {
    const now = new Date()
    const month = now.getMonth() + 1 // 1-12
    const day = now.getDate()

    // Navidad (Diciembre 1-31)
    if (month === 12) {
      return {
        name: 'Navidad',
        colors: {
          primary: '#165834', // Verde navideño
          secondary: '#C41E3A', // Rojo navideño
          accent: '#FFD700' // Dorado
        },
        emoji: '🎄',
        banner: 'ESPECIAL NAVIDAD - Regalos perfectos con envío express 🎅',
        gradient: 'from-red-600 via-green-600 to-red-600'
      }
    }

    // Año Nuevo (Enero 1-7)
    if (month === 1 && day <= 7) {
      return {
        name: 'Año Nuevo',
        colors: {
          primary: '#1e3a8a', // Azul
          secondary: '#fbbf24', // Dorado
          accent: '#fbbf24'
        },
        emoji: '🎉',
        banner: 'FELIZ AÑO NUEVO - Empieza el año ahorrando hasta 60% 🥳',
        gradient: 'from-yellow-400 via-blue-500 to-purple-600'
      }
    }

    // San Valentín (Febrero 1-14)
    if (month === 2 && day <= 14) {
      return {
        name: 'San Valentín',
        colors: {
          primary: '#be185d', // Rosa intenso
          secondary: '#dc2626', // Rojo
          accent: '#fda4af' // Rosa claro
        },
        emoji: '💝',
        banner: 'SAN VALENTÍN - Regalos con amor y descuentos especiales 💕',
        gradient: 'from-pink-500 via-red-500 to-pink-500'
      }
    }

    // Primavera (Marzo 20 - Mayo 31)
    if ((month === 3 && day >= 20) || month === 4 || month === 5) {
      return {
        name: 'Primavera',
        colors: {
          primary: '#16a34a', // Verde primavera
          secondary: '#f59e0b', // Amarillo
          accent: '#ec4899' // Rosa
        },
        emoji: '🌸',
        banner: 'PRIMAVERA EN FLOR - Renueva tu estilo con ofertas frescas 🌷',
        gradient: 'from-green-400 via-yellow-400 to-pink-400'
      }
    }

    // Halloween (Octubre 1-31)
    if (month === 10) {
      return {
        name: 'Halloween',
        colors: {
          primary: '#f97316', // Naranja
          secondary: '#7c3aed', // Púrpura
          accent: '#000000' // Negro
        },
        emoji: '🎃',
        banner: 'HALLOWEEN SPOOKY SALE - Ofertas de miedo hasta 50% OFF 👻',
        gradient: 'from-orange-600 via-purple-600 to-black'
      }
    }

    // Black Friday (Noviembre 15-30)
    if (month === 11 && day >= 15) {
      return {
        name: 'Black Friday',
        colors: {
          primary: '#000000',
          secondary: '#ff0000',
          accent: '#fbbf24'
        },
        emoji: '🛍️',
        banner: 'BLACK FRIDAY - MEGA DESCUENTOS hasta 70% OFF 🔥',
        gradient: 'from-black via-red-600 to-black'
      }
    }

    // Verano (Junio-Agosto)
    if (month >= 6 && month <= 8) {
      return {
        name: 'Verano',
        colors: {
          primary: '#0ea5e9', // Azul cielo
          secondary: '#f59e0b', // Amarillo sol
          accent: '#06b6d4' // Cyan
        },
        emoji: '☀️',
        banner: 'VERANO CALIENTE - Ofertas refrescantes y envío gratis 🏖️',
        gradient: 'from-sky-400 via-yellow-400 to-cyan-400'
      }
    }

    return null
  }

  const currentTheme = getHolidayTheme()

  return {
    holidayTheme: currentTheme,
    isHoliday: currentTheme !== null
  }
}