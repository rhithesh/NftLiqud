import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="m-auto bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-800 mb-4">
              404
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-500 mb-2">
              Sorry, We cannot find the requested page.
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-700 mb-6">
              You are lost!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out w-full sm:w-auto"
            >
              <span className="mr-2">Go to home</span>
            </Link>
          </div>
          <div className="lg:w-1/2 bg-orange-100 p-6 sm:p-8 lg:p-12 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <Image
                src="/404.png"
                width={200}
                height={200}
                alt="404 Error Illustration"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
