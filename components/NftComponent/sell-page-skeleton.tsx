import { Skeleton } from "@/components/ui/skeleton"

export function SellPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-64 mb-8" />
        
        {/* NFT Banner Skeleton */}
        <Skeleton className="w-full h-64 rounded-lg mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Card Skeleton */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <Skeleton className="h-8 w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Card Skeleton */}
          <div className="bg-white p-6 rounded-lg shadow">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <div className="bg-orange-100 p-4 rounded-lg mb-4">
              <Skeleton className="h-6 w-40 mb-2" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Additional Information Skeleton */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <Skeleton className="h-8 w-48 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-full mb-2" />
          ))}
        </div>

        {/* CTA Section Skeleton */}
        <div className="mt-8 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-6" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    </div>
  )
}
