import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer" onClick={() => onViewProducts(collection.id)}>
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Sin imagen
            </div>
          )}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-3xl font-light tracking-widest mb-3">
              {collection.name}
            </h3>
            {collection.description && (
              <p className="text-sm font-light tracking-wide opacity-90 mb-6 max-w-xs">
                {collection.description}
              </p>
            )}
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black transition-all font-light tracking-wide"
            >
              Explorar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}